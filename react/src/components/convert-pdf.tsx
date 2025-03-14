import { useState } from "react";
import { PDFDocument } from "pdf-lib";

const CompressPDF = () => {
    const [compressedFile, setCompressedFile] = useState<Blob | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = async () => {
                if (!reader.result) return;

                const pdfDoc = await PDFDocument.load(reader.result as ArrayBuffer, { updateMetadata: false });
                const compressedBytes = await pdfDoc.save({ useObjectStreams: true });

                const blob = new Blob([compressedBytes], { type: "application/pdf" });
                setCompressedFile(blob);
            };
        } catch (error) {
            console.error("Erro ao compactar PDF:", error);
        }
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} />
            {compressedFile && (
                <a href={URL.createObjectURL(compressedFile)} download="arquivo_compactado.pdf">
                    <button>Baixar PDF Compactado</button>
                </a>
            )}
        </div>
    );
};

export default CompressPDF;
