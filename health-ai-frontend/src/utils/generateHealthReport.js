import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import { BRAND } from "./pdfBranding";

export async function generateHealthReport(result) {
  const doc = new jsPDF("p", "mm", "a4");

  const PAGE_HEIGHT = doc.internal.pageSize.height;
  const PAGE_WIDTH = doc.internal.pageSize.width;

  let page = 1;

  // ---------- HEADER & FOOTER ----------

  const addHeader = () => {
    try {
      doc.addImage("/logo.png", "PNG", 15, 10, 20, 20);
    } catch {}

    doc.setFontSize(16);
    doc.setTextColor(...BRAND.primaryColor);
    doc.text(BRAND.name, 40, 22);

    doc.setDrawColor(...BRAND.primaryColor);
    doc.line(15, 35, PAGE_WIDTH - 15, 35);
  };

  const addFooter = () => {
    doc.setFontSize(9);
    doc.setTextColor(...BRAND.gray);
    doc.text(
      `Page ${page}`,
      PAGE_WIDTH / 2,
      PAGE_HEIGHT - 10,
      { align: "center" }
    );
  };

  addHeader();

  // ---------- BASIC INFO TABLE ----------

  autoTable(doc, {
    startY: 45,
    head: [["Basic Health Details", ""]],
    body: [
      ["Age", `${result.basicInfo.age} years`],
      ["Height", `${result.basicInfo.height} cm`],
      ["Weight", `${result.basicInfo.weight} kg`],
      [
        "BMI",
        `${result.basicInfo.bmi} (${result.basicInfo.bmiCategory})`
      ]
    ],
    theme: "grid",
    headStyles: {
      fillColor: BRAND.primaryColor,
      textColor: 255,
      halign: "left"
    },
    styles: {
      fontSize: 11
    }
  });

  // ---------- RISK SUMMARY TABLE ----------

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Risk Summary", ""]],
    body: [
      ["Risk Level", result.risk.level],
      ["Risk Score", String(result.risk.score)]
    ],
    theme: "grid",
    headStyles: {
      fillColor: BRAND.primaryColor,
      textColor: 255
    },
    styles: {
      fontSize: 11
    }
  });

  // ---------- RISK FACTORS ----------

  if (result.riskFactors.length > 0) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Key Risk Factors"]],
      body: result.riskFactors.map(f => [f]),
      theme: "striped",
      headStyles: {
        fillColor: BRAND.primaryColor,
        textColor: 255
      },
      styles: { fontSize: 11 }
    });
  }

  // ---------- RECOMMENDATIONS ----------

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Recommendations"]],
    body: [
      ["Nutrition", result.recommendations.nutrition.join("\n")],
      ["Exercise", result.recommendations.exercise.join("\n")],
      ["Lifestyle", result.recommendations.lifestyle.join("\n")]
    ],
    theme: "grid",
    headStyles: {
      fillColor: BRAND.primaryColor,
      textColor: 255
    },
    styles: {
      fontSize: 11,
      cellPadding: 4
    }
  });

  // ---------- AI NOTE ----------

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["AI Insight"]],
    body: [[result.aiNote]],
    theme: "plain",
    styles: {
      fontSize: 11
    }
  });

  // ---------- QR CODE SECTION ----------

  const shareUrl = "https://your-app-url.com"; // change later if needed

  const qrDataUrl = await QRCode.toDataURL(shareUrl);

  const qrY = doc.lastAutoTable.finalY + 15;

  if (qrY > PAGE_HEIGHT - 40) {
    addFooter();
    doc.addPage();
    page++;
    addHeader();
  }

  doc.setFontSize(11);
  doc.text("Scan to access the health app:", 20, qrY);

  doc.addImage(qrDataUrl, "PNG", 20, qrY + 5, 30, 30);

  // ---------- DISCLAIMER ----------

  doc.setFontSize(9);
  doc.setTextColor(...BRAND.gray);
  doc.text(
    "Disclaimer: This report is for informational purposes only and does not replace professional medical advice.",
    20,
    PAGE_HEIGHT - 25,
    { maxWidth: 170 }
  );

  // ---------- FOOTER ----------
  addFooter();

  // ---------- SAVE ----------
  doc.save("Health_Assessment_Report.pdf");
}
