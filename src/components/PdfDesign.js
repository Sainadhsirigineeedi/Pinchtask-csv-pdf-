import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import image from '../utilites/taskphoto.ong.jpg';
import qrcode from '../utilites/qrcode.png'
import pinchlogo from '../utilites/pinchlogo.png'
import PieChartImage from "./PieChartImage";

const generatePDF = async(data, index) => {
 
    const payableFields=[
    {
      label:"Available Balance",
      value:data.Available_Balance
    },{
      label:"Subscription_Fee",
      value:data.Subscription_Fee
    },
    {
      label:"Expenses Made on Your Behalf",
      value:data.Expenses_Made_on_Your_Behalf

    },
    {
      label:"Advance for Subscription",
      value:data.Advance_for_Subscription

    },
    {
      label:"Advance for Expenses",
      value:data.Advance_for_Expenses

    }
    
  ]

  const Top5=[
    {
      label:"Recommendations and Purchases",
      value:data.Recommendations_and_Purchases
    },{
      label:"Trained Manpower",
      value:data.Trained_Manpower
    },
    {
      label:"Repairs And Maintenance",
      value:data.Repairs_And_Maintenance
    },
    {
      label:"Out of home Errands",
      value:data.Out_of_home_Errands

    },
    {
      label:"Housekeeping and Organization",
      value:data.Housekeeping_and_Organization


    }
    
  ]
   
  const amount=parseInt(data.Available_Balance)+500;
  const pichart=await PieChartImage(Top5)
       
        const doc = new jsPDF(); 
   
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.addImage(pinchlogo,"PNG",14,6,24,8);
        
         doc.text(`${data.Date}`,180,12)
        doc.text(`${data.Name}`, 14, 19);
        doc.text(`Customer_ID: ${data.Customer_ID}`,160,19);
  
        doc.setFontSize(8);
        doc.setFillColor(150, 75, 0); 
        doc.rect(14, 20, 180, 4, "F"); 
        doc.setTextColor(255, 255, 255); 
        doc.text("Bill Summary",92, 23);
       
        autoTable(doc, {
          startY: 24,
          margin: { left: 14 },
          tableWidth:90,
          head: [["Description", "Amount"]],
          body: payableFields.map((field) => [field.label, field.value || ""]),
          headStyles: {
         fillColor: [255, 255, 255],     
         textColor: [150, 75, 0],        
         fontStyle: 'bold',
        },
        styles: {
      fontSize: 6,                    
      textColor: [0, 0, 0],           
    },
        });
        
         const finaltableY = doc.lastAutoTable.finalY + 2;
  
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(150, 75, 0);
        doc.text("pay to",110, 34);
        
        doc.setFontSize(6);
        doc.setTextColor(0, 0, 0);
        doc.text("scan to pay",180,34);
  
        doc.setFontSize(6);
        doc.setTextColor(150, 75, 0);
        doc.text("Pinch Lifestyle Services Private Limited",110, 40);
        doc.text("Account number - 73250500402",110, 44);
        doc.text("IFSC - ICICI0007325",110, 62);
        doc.text("ICICI Bank Limeted",110, 66);
        doc.addImage(qrcode, "PNG", 176,36,22,24);
        doc.setDrawColor(150, 75, 0);
        doc.setLineWidth(0.8);
        doc.line(14, finaltableY+1, 104, finaltableY+1);
        doc.line(14, finaltableY+6, 104, finaltableY+6);
  
        doc.setFontSize(8);
        doc.setTextColor(150, 75, 0);
        doc.text("Total Payable Amount",14,finaltableY+4);
        doc.text(`${amount}`,84,finaltableY+4);
  
        doc.setFontSize(6);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0,0,0)
        const note = "Note: The Advance for Expenses is calculated based on your average expenses over the last two months";
        const wrappedNote = doc.splitTextToSize(note, 90);
        doc.text(wrappedNote, 14, finaltableY + 9);
  
        // col2
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setFillColor(150, 75, 0); 
        doc.rect(14, finaltableY+12, 180, 4, "F"); 
        doc.setTextColor(255, 255, 255); 
        doc.text("Everything We Handeled to Simplify Things for You",80, finaltableY+15);
  
      
       doc.addImage(pichart, "PNG", 65, finaltableY + 18, 100, 45);

  
      //  col3
        doc.setFontSize(8);
        doc.setFillColor(150, 75, 0); 
        doc.rect(14, finaltableY+62, 180, 4, "F"); 
        doc.setTextColor(255, 255, 255);
        doc.text("Everything We Handeled to Simplify Things for You",80, finaltableY+65); 
  
        autoTable(doc, {
          startY: finaltableY+67,
          margin: { left: 14 },
          tableWidth:130,
          head: [["Category", "No.of Tasks"]],
          body: Top5.map((field) => [field.label, field.value || ""]),
          headStyles: {
         fillColor: [255, 255, 255],     
         textColor: [150, 75, 0],        
         fontStyle: 'bold',
        },
        styles: {
      fontSize: 6,                      
      textColor: [0, 0, 0],           
    },
    columnStyles: {
      0: { cellWidth: 130,halign:'left' }, 
      1: { cellWidth: 50 ,halign: 'right'} 
    },
      didParseCell: function (data) {
      
      if (data.section === 'head' && data.column.index === 1) {
        data.cell.styles.halign = 'right';
      }
    }
        });
  
        
        
        // col4
        const finaltableY2 = doc.lastAutoTable.finalY+ 2;
        doc.setDrawColor(150, 75, 0);
        doc.setLineWidth(0.5);
        doc.line(14, finaltableY2+1, 104, finaltableY2+1);
        doc.line(14, finaltableY2+6, 104, finaltableY2+6);
        doc.line(104, finaltableY2 + 1, 104, finaltableY2 + 6);
  
        doc.line(110, finaltableY2+1, 194, finaltableY2+1);
        doc.line(110, finaltableY2+6, 194, finaltableY2+6);
        doc.line(110, finaltableY2 + 1, 110, finaltableY2 + 6);
  
        doc.setFontSize(6);
        doc.setTextColor(0,0,0);
        doc.text("* As Compared to the last months",14,finaltableY2+10);
  
       
        doc.setFontSize(10);
        doc.setTextColor(150,75,0);
        doc.text("How the Design of Your Home Shapes Your Mind",14,finaltableY2+14);
  
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6);
        doc.setTextColor(0, 0, 0)
        const note2 = "Your home speaks to your mind long before you realise it. From the dining table that invites connection to the corner that calls for calm, this month we explore the science behind intentional spaces.";
        const wrappedNote2 = doc.splitTextToSize(note2, 120);
        const note3= "Explore how an intentional reset can transform how you feel within your home and if it's something you're considering, we'd be glad to help.";
        const wrappedNote3 = doc.splitTextToSize(note3, 94);
        doc.text(wrappedNote2, 14, finaltableY2 + 17);
        doc.text(wrappedNote3, 14, finaltableY2 + 28);
        doc.addImage(image, "PNG", 140,finaltableY2+10,60,35);
        
        doc.setFontSize(6);
        doc.setTextColor(150, 75, 0);
        doc.text("To Know more,scan here",14,finaltableY2+40);
        doc.addImage(qrcode, "PNG", 45,finaltableY2+32,22,20);
  
        doc.setFontSize(6);
         doc.setFont("helvetica", "bold");
        doc.setFillColor(150, 75, 0); 
        doc.rect(14, finaltableY2+50, 180, 8, "F"); 
        doc.setTextColor(255, 255, 255);
        doc.text("Kindly note that we now provide links to access all your invoices instead of attaching them as separate PDFs. You can find the details at the end of this document.",18, finaltableY2+54.5);
     
    
       
  
  
  return doc;
};

export default generatePDF;