import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import FileDropZone from "@/components/tools/FileDropZone";
import { Button } from "@/components/ui/button";
import { spreadsheetToJson, jsonToCsv } from "@/lib/tools/csvJson";
import { trackToolUsage } from "@/lib/hitCounter";

type Mode = "toJson" | "toCsv";

const CsvJsonPage = () => {
  const { t } = useTranslation("tools");
  const [mode, setMode] = useState<Mode>("toJson");

  const [file, setFile] = useState<File | null>(null);
  const [jsonInput, setJsonInput] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeMode = (next: Mode) => {
    setMode(next);
    setFile(null);
    setJsonInput("");
    setResultUrl(null);
    setError(null);
  };

  const handleFile = async (selected: File) => {
    setFile(selected);
    setError(null);
    setProcessing(true);
    try {
      const json = await spreadsheetToJson(selected);
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
      setResultUrl(URL.createObjectURL(blob));
      setResultName(`${selected.name.replace(/\.[^.]+$/, "")}.json`);
    } catch {
      setError(t("ui.error_generic"));
    } finally {
      setProcessing(false);
    }
  };

  const handleConvertToCsv = async () => {
    setError(null);
    setProcessing(true);
    try {
      const csv = await jsonToCsv(jsonInput);
      const blob = new Blob([csv], { type: "text/csv" });
      setResultUrl(URL.createObjectURL(blob));
      setResultName("datos.csv");
      trackToolUsage("csv-json");
    } catch {
      setError(t("ui.json_invalid"));
    } finally {
      setProcessing(false);
    }
  };

  const modeButtonClass = (active: boolean) =>
    `rounded-full px-6 ${
      active
        ? "bg-white text-black hover:bg-white/80"
        : "bg-transparent text-white border border-neutral-700 hover:bg-white/10"
    }`;

  return (
    <ToolPageLayout toolId="csv-json">
      <div className="flex justify-center gap-3 mb-6">
        <Button onClick={() => changeMode("toJson")} className={modeButtonClass(mode === "toJson")}>
          {t("ui.csv_to_json_button")}
        </Button>
        <Button onClick={() => changeMode("toCsv")} className={modeButtonClass(mode === "toCsv")}>
          {t("ui.json_to_csv_button")}
        </Button>
      </div>

      <div className="border border-neutral-800 rounded-xl p-6 md:p-8 space-y-4">
        {mode === "toJson" ? (
          !file ? (
            <FileDropZone
              accept=".csv,.xlsx,.xls"
              label={t("ui.upload_label_spreadsheet")}
              hint={t("ui.upload_hint_spreadsheet")}
              onFile={handleFile}
              toolId="csv-json"
            />
          ) : (
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400 truncate max-w-[60%]">{file.name}</span>
              <Button
                variant="outline"
                onClick={() => changeMode("toJson")}
                className="rounded-full px-6 border-neutral-700 text-white bg-transparent hover:bg-white/10"
              >
                {t("ui.reset_button_file")}
              </Button>
            </div>
          )
        ) : (
          <>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder={t("ui.json_placeholder")}
              className="w-full h-56 bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-200 font-mono resize-y focus:outline-none focus:border-neutral-600"
            />
            <Button
              onClick={handleConvertToCsv}
              disabled={!jsonInput.trim()}
              isLoading={processing}
              loadingText={t("ui.processing")}
              className="bg-white text-black hover:bg-white/80 rounded-full px-8"
            >
              {t("ui.convert_button")}
            </Button>
          </>
        )}

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {resultUrl && (
          <a href={resultUrl} download={resultName}>
            <Button className="bg-white text-black hover:bg-white/80 rounded-full px-8">
              <Download className="w-4 h-4" />
              {t("ui.download_button")}
            </Button>
          </a>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default CsvJsonPage;
