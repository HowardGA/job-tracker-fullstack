import api from "./axios";

export const uploadCVRequest = (file: File) => {
    const formData = new FormData();
    formData.append('cv', file)
    return api.post('/cv/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
} 

export const getCVRequest = () => {
    return api.get('/cv/');
}

export const replaceCVRequest = (file: File) => {
    const formData = new FormData();
    formData.append('cv',file);
    return api.patch('/cv/', formData, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}