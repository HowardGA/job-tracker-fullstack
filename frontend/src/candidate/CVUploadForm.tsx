import { useForm } from "react-hook-form";
import { cvSchema, type cvFormInput } from "../types/cvTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaFilePdf, FaUpload } from "react-icons/fa6";
import { useUploadCV } from "../queries/cv.queries";
import { toast } from "sonner";

const CVUploadForm = ({isEditMode} : {isEditMode: boolean}) => {
    const { register, handleSubmit, watch,formState: { errors} } = useForm({
        resolver: zodResolver(cvSchema)
    });
    const cvMutation = useUploadCV(isEditMode);
    const selectedFile = watch("cv");
    const fileName = selectedFile?.[0]?.name;

    const onSubmit = (data: cvFormInput) => {
        toast.promise(cvMutation.mutateAsync(data.cv[0]),{
            loading: isEditMode ? "Replacing CV..." : "Uploading CV...",
            success: 'Action successful!',
            error: (error) => error
        });
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
      <div className="group relative">
        <label className={`
          flex flex-col items-center justify-center w-full h-32 
          border-2 border-dashed rounded-2xl cursor-pointer transition-all
          ${errors.cv ? "border-red-500 bg-red-500/5" : "border-neutral-700 bg-neutral-800/20 hover:border-sky-500 hover:bg-sky-500/5"}
        `}>
          <input 
            type="file" 
            className="hidden" 
            accept=".pdf"
            {...register("cv")} 
          />
          
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {fileName ? (
              <>
                <FaFilePdf className="w-8 h-8 text-sky-500 mb-2" />
                <p className="text-sm text-neutral-300 font-medium truncate max-w-[200px]">
                  {fileName}
                </p>
              </>
            ) : (
              <>
                <FaUpload className="w-8 h-8 text-neutral-500 group-hover:text-sky-500 mb-2" />
                <p className="text-sm text-neutral-400">
                  <span className="font-semibold text-sky-500">Click to upload</span> or drag
                </p>
                <p className="text-xs text-neutral-500">PDF only (max. 5MB)</p>
              </>
            )}
          </div>
        </label>
      </div>

      {errors.cv && (
        <p className="text-xs text-red-400 mt-2 text-center">
          {errors.cv.message as string}
        </p>
      )}

      <button
        type="submit"
        disabled={!fileName || cvMutation.isPending}
        className="w-full mt-4 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg"
      >
        {cvMutation.isPending ? "Processing..." : isEditMode ? "Replace CV" : "Upload CV"}
      </button>
    </form>
  );
};

export default CVUploadForm;