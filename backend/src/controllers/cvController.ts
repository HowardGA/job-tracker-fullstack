import { Request, Response, NextFunction } from "express";
import { saveCVPath, getCVPath } from "../services/cvService";

import { getPrivateCVUrl, replaceCV, uploadCV } from "../middleware/storageHandle";

export const handleCVUpload = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        if (!req.file) throw new Error("No file to upload");
        const userId = req.user?.userId

        const cvUrl = await uploadCV(req.file, userId || '');

        await saveCVPath(cvUrl, userId || '');

        const signedUrl = await getPrivateCVUrl(cvUrl);

        res.status(200).json({message: 'CV Uploaded', url: signedUrl});
    } catch (error) {
        next(error);
    }
};

export const handleGetCV = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        const CVDBPath = await getCVPath(userId || '');

        if (!CVDBPath) return res.status(404).json({message: 'No CV found'});

        const signedUrl = await getPrivateCVUrl(CVDBPath || '');
        res.status(200).json({url: signedUrl});
    } catch (error) {
        next(error);
    }
};

export const handleReplace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.file) return res.status(400).json({ message: "No file provided" });
        const userId = req.user?.userId;

        const pathInDB = await getCVPath(userId || '');
        if (!pathInDB) {
            const newPath = await uploadCV(req.file, userId || '');
            await saveCVPath(newPath, userId || '');
            const signedUrl = await getPrivateCVUrl(newPath);
            return res.status(200).json({ message: 'CV uploaded!', url: signedUrl });
        }

        const path =  await replaceCV(req.file, userId || '', pathInDB);
        await saveCVPath(path, userId || '');
        
        const signedUrl = await getPrivateCVUrl(path);
        res.status(200).json({message: 'CV replaced!', url: signedUrl});
    } catch (error) {
        next(error);
    }
};