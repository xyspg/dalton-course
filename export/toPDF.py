import requests
import json
import pandas as pd
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Spacer, Paragraph
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

pdfmetrics.registerFont(TTFont('Songti', 'Songti.ttc'))

data = requests.get("https://fbgv2m2h.api.sanity.io/v2022-03-07/data/query/production?query=*%5B+_type+%3D%3D+%22course%22%5D+%7C+order%28category%29&tag=sanity.studio.vision")
data = data.json()
data = data['result']

pdf_path = "courses.pdf"
pdf = SimpleDocTemplate(pdf_path, pagesize=letter)
elements = []

styles = getSampleStyleSheet()
normal_style = styles['Normal']
heading_style = ParagraphStyle(name='Heading1',
                                  fontSize=18,
                                  leading=22,
                                  spaceAfter=6,
                               fontName='Songti')

# Custom paragraph style for wrapping text in cells
cell_style = ParagraphStyle('cell', parent=styles['Normal'], wordWrap='CJK', fontName='Songti')

for course in data:
    # Add a header with the course name as a table
    course_header = [[Paragraph(course['courseName'], heading_style)]]
    header_table = Table(course_header, colWidths=[460], rowHeights=[25])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
    ]))
    elements.append(header_table)
    elements.append(Spacer(1, 12))

    # Extract course details and format them into a table with wrapped text
    course_details = [
        ['Course Type:', Paragraph(course['courseType'], cell_style)],
        ['Category:', Paragraph(course.get('category', ''), cell_style)],
        ['Instructor:', Paragraph(course['instructor'], cell_style)],
        ['Grade:', Paragraph(', '.join(map(str, course['grade'])), cell_style)],
        ['Semester:', Paragraph(', '.join(map(str, course['semester'])), cell_style)],
        ['Pre-requisite:', Paragraph(course.get('preRequisite', ''), cell_style)],
        ['Description:', Paragraph(course['description'], cell_style)],
        ['Objectives:', Paragraph(course['objectives'], cell_style)],
        ['Assessment:', Paragraph(course.get('assessment', ''), cell_style)]
    ]

    # Create a table for course details
    details_table = Table(course_details, colWidths=[150, 310])
    details_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('INNERGRID', (0, 0), (-1, -1), 0.25, colors.black),
        ('BOX', (0, 0), (-1, -1), 0.25, colors.black),
    ]))

    elements.append(details_table)
    elements.append(Spacer(1, 12))

# Build the PDF
pdf.build(elements)