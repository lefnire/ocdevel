import pdb, re

"""
Getting really poor quality with PyPDF2. Try github branch or some flags?
"""
# import PyPDF2
#
# with open('frogs.pdf', 'rb') as in_, open('frogs.txt', 'w') as out_:
#     pdf = PyPDF2.PdfFileReader(in_)
#     lines = []
#     for p in range(pdf.numPages):
#         page = pdf.getPage(p)
#         txt = txtOrig = page.extractText()
#
#         # remove any page numbers
#         # TODO this will remove numbers at beginning/end of page, so be careful
#         txt = re.sub(r'^[0-9]+ ', '', txt)
#         txt = re.sub(r' [0-9]$', '', txt)
#         txt = txt.replace('Š', ' ')
#
#         lines.append(txt)
#     lines = '\n\n'.join(lines)
#     out_.write(lines)
#


from io import StringIO
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser

output_string = StringIO()
with open('frogs.pdf', 'rb') as in_file:
    parser = PDFParser(in_file)
    doc = PDFDocument(parser)
    rsrcmgr = PDFResourceManager()
    device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    for page in PDFPage.create_pages(doc):
        interpreter.process_page(page)

txt = output_string.getvalue()
pdb.set_trace()
with open('frogs.txt', 'w') as f:
    f.write(txt)