import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

const folder = 'job_tracker';

export const uploadCV = async (file: Express.Multer.File, userId: string) => {
    const fileName = `cv-${userId}-${Date.now()}.pdf`;
    const fullPath = `${folder}/${fileName}`;

    if (file.mimetype !== 'application/pdf') {
        throw new Error('Only PDF files are allowed');
    }

    const {data, error} = await supabase.storage
        .from('portfolio')
        .upload(fullPath, file.buffer, {
            contentType: 'application/pdf',
            upsert: true
        });
        
    if (error) throw error;

    return data.path;
};

export const getPrivateCVUrl = async (pathInDB: string) => {
    const {data, error} = await supabase.storage
        .from('portfolio')
        .createSignedUrl(pathInDB, 900);

    if (error) throw error;

    return data.signedUrl;
}

export const replaceCV = async (file: Express.Multer.File, userId: string,pathInDB: string) => {
    await supabase.storage
        .from('portfolio')
        .remove([pathInDB]);

    const path = await uploadCV(file, userId);

    return path;
}