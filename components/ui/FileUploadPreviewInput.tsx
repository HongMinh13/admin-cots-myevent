import { uploadFile } from "@/lib";
import { useState } from "react";
import { Input } from "./input";
import useUploadFile from "@/hooks/use-upload-file";

interface FileUploadIInputProps {
  onFieldChange: (event: { target: { value: string } }) => void;
  value?: string
  className?: string
}
const toBase64 = (file: Blob) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
	});
function FileUploadInput({
  onFieldChange,
  value,
  className
}: FileUploadIInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string| undefined>(value);
  const [loading, setLoading] = useState(false);
  const { uploadImage } = useUploadFile();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event?.target?.files?.[0];
    if (selectedFile) {
      setLoading(true);
      const image: string = (await toBase64(selectedFile as Blob)) as string;

      const { data } = await uploadImage({
				input: {
					file: image,
					folder: 'avatar',
				},
			});

			const url = data?.uploadImage;
      setPreviewUrl(url);
      console.log(url)
			onFieldChange?.({
				target: {
					value: url as string,
				},
			});

			setLoading(false);
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileUpload} className={className} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        previewUrl && (
          <div>
            <img src={previewUrl} alt="Preview" style={{ maxWidth: '400px' }} />
          </div>
        )
      )}
    </div>
  );
}

export default FileUploadInput;