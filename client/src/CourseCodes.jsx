
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const CourseCodes = () => {
    const [courses, setCourses] = useState({});

    
    const navigate = useNavigate();

    useEffect(() => {
       
        const fetchCourseCodes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/get-courses');
                console.log("Fetched Courses:", response.data);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching course codes:', error);
            }
        };
        fetchCourseCodes();
        
    }, []);
   
    
    const downloadPDF = () => {
        try {
            const doc = new jsPDF({
                orientation: "portrait", 
                unit: "mm",
                format: "a4",
            });
    
            doc.setFontSize(18);
            doc.text("Course Codes List", 14, 15);
    
            let y = 25; 
            Object.keys(courses).forEach((section) => {
               
                if (y > 260) {
                    doc.addPage();
                    y = 20;
                }
    
             
             
                if (courses[section].length > 0) {
                    const tableColumn = ["Course Name", "Course Code"];
                    const tableRows = [];
    
                    courses[section].forEach(({ courseName, courseCode }) => {
                        tableRows.push([courseName, courseCode]);
                    });
    
                    autoTable(doc, {
                        startY: y,
                        head: [tableColumn],
                        body: tableRows,
                        theme: "grid",
                        styles: { fontSize: 10, cellPadding: 3 },
                        columnStyles: {
                            0: { cellWidth: 80 },
                            1: { cellWidth: 50 }, 
                        },
                        margin: { left: 14, right: 14 },
                        didDrawPage: function (data) {
                            y = data.cursor.y + 10; 
                        },
                    });
    
                    y = doc.lastAutoTable.finalY + 10; 
                }
            });
    
            doc.save("CourseCodes.pdf"); 
        } catch (error) {
            console.error("PDF Generation Error:", error);
        }
    };
    

    return (

<div className="background-image-container">
<div className="table-container">
    <div className="header-container">
        <h1 className="section-heading">Course Code List</h1>
        <button className="btn download-btn" onClick={downloadPDF}>Download PDF</button>
    </div>
    
    {Object.keys(courses).length === 0 ? (
        <p>No course codes generated yet.</p>
    ) : (
        Object.entries(courses).map(([department, coursesList]) => (
            <div key={department}>
               
                <table className="table">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Course Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coursesList.map(({ courseName, courseCode }) => (
                            <tr key={courseCode}>
                                <td>{courseName}</td>
                                <td>{courseCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              
            </div>
            
        ))
    )}
      <button className="btn w-100" style={{marginBottom:"20px"}} onClick={() => navigate('/home')}>Back to Home</button>
</div>
</div>

    );
};

export default CourseCodes;

