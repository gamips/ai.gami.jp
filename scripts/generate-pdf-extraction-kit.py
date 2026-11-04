"""Create the fictional PDF table reconciliation kit; requires reportlab."""
import csv
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A5, landscape

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "public/assets/files/insights/ai-pdf-extraction-checklist"
ROWS = [
    [1, 1, "封筒", 2, "箱", "100枚入"],
    [1, 2, "クリアファイル", 4, "袋", "10枚入"],
    [2, 1, "ノート", 3, "冊", "-"],
    [2, 2, "付箋", 5, "個", "-"],
]
def main():
    DEST.mkdir(parents=True, exist_ok=True)
    pdfmetrics.registerFont(TTFont("Japanese", "C:/Windows/Fonts/YuGothR.ttc", subfontIndex=0))
    pdf = canvas.Canvas(str(DEST / "source.pdf"), pagesize=landscape(A5), invariant=1)
    pdf.setTitle("備品一覧｜PDF表の照合練習")
    pdf.setAuthor("GAMI")
    width, height = landscape(A5)
    for page in [1, 2]:
        pdf.setFillColor(HexColor("#0891b2"))
        pdf.setFont("Helvetica-Bold", 10)
        pdf.drawString(40, height-38, "GAMI")
        pdf.setFillColor(HexColor("#18181b"))
        pdf.setFont("Japanese", 22)
        pdf.drawString(40, height-80, "備品一覧｜PDF表の照合練習")
        pdf.setFont("Japanese", 10)
        pdf.setFillColor(HexColor("#52525b"))
        pdf.drawString(40, height-104, "架空の練習用データです。実際の取引には使いません。")
        top=height-146
        positions=[40,260,340,420]
        pdf.setStrokeColor(HexColor("#0891b2"))
        pdf.setLineWidth(1)
        pdf.line(40,top+18,width-40,top+18)
        pdf.setFont("Japanese", 11)
        for x,label in zip(positions,["品名","数量","単位","入数"]):
            pdf.drawString(x+8,top-4,label)
        pdf.setStrokeColor(HexColor("#d4d4d8"))
        pdf.setLineWidth(0.5)
        pdf.line(40,top-18,width-40,top-18)
        pdf.setFillColor(HexColor("#18181b"))
        pdf.setFont("Japanese", 14)
        for n,row in enumerate(r for r in ROWS if r[0]==page):
            y=top-52-n*54
            for x,value in zip(positions,row[2:]):
                pdf.drawString(x+8,y,str(value))
            pdf.line(40,y-18,width-40,y-18)
        pdf.setFillColor(HexColor("#71717a"))
        pdf.setFont("Helvetica", 9)
        pdf.drawString(40,35,"ai.gami.jp")
        pdf.drawRightString(width-40,35,f"{page} / 2")
        pdf.showPage()
    pdf.save()
    with (DEST/"answer.csv").open("w",encoding="utf-8-sig",newline="") as f:
        writer=csv.writer(f)
        writer.writerow(["ページ","行","品名","数量","単位","入数"])
        writer.writerows(ROWS)
    with (DEST/"check.tsv").open("w",encoding="utf-8-sig",newline="") as f:
        writer=csv.writer(f,delimiter="\t")
        writer.writerow(["原本のページ","原本の行","項目","取り出した値","原本の値","対応"])
        writer.writerows([[""]*6 for _ in range(8)])
    print("Created source.pdf (2 pages), answer.csv (4 rows), check.tsv (8 blank rows)")
if __name__ == "__main__":
    main()

