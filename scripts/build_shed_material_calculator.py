from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter


OUTPUT_PATH = Path(
    "/Users/uday/Self/Carpediem/Nine-Billion-Names-Of-God/bedford-garden/outputs/shed-material-calculator/shed-material-calculator.xlsx"
)


TIMBER_ROWS = [
    ["chatgpt-design-1", "original", "main framing", "38 x 63 mm structural softwood", 72.0, 2.4, 32, 0.10, 2.4, "source design says about 72 m, buy 32 lengths at 2.4 m"],
    ["chatgpt-design-1", "original", "secondary timber", "25 x 50 mm battens", 24.0, 2.4, 10, 0.10, 2.4, "source design says about 24 m, buy 10 lengths at 2.4 m"],
    ["chatgpt-design-1", "simplified", "main framing", "38 x 63 mm CLS", 72.0, 3.0, 27, 0.10, 3.0, "simplified common spec"],
    ["chatgpt-design-1", "simplified", "secondary timber", "25 x 38 mm", 24.0, 3.0, 9, 0.10, 3.0, "simplified common spec"],
    ["chatgpt-design-2", "original", "main framing", "45 x 70 mm CLS", 57.6, 2.4, 24, 0.10, 2.4, "source design gives 24 lengths at 2.4 m"],
    ["chatgpt-design-2", "original", "secondary timber", "38 x 50 mm battens", 36.0, 2.4, 15, 0.10, 2.4, "source design gives 15 lengths at 2.4 m"],
    ["chatgpt-design-2", "simplified", "main framing", "38 x 63 mm CLS", 57.6, 3.0, 22, 0.10, 3.0, "simplified common spec"],
    ["chatgpt-design-2", "simplified", "secondary timber", "25 x 38 mm", 36.0, 3.0, 14, 0.10, 3.0, "simplified common spec"],
    ["chatgpt-design-3", "original", "main framing", "38 x 63 mm structural timber", 95.0, 3.0, 36, 0.10, 3.0, "source design says about 95 m, order about 36 lengths"],
    ["chatgpt-design-3", "original", "secondary timber", "38 x 38 mm cleats / lips / rails", 16.0, 3.0, 6, 0.10, 3.0, "source design says about 16 m"],
    ["chatgpt-design-3", "original", "secondary timber", "18 x 44 mm stop battens / trims", 8.0, 3.0, 3, 0.10, 3.0, "source design says about 8 m"],
    ["chatgpt-design-3", "simplified", "main framing", "38 x 63 mm CLS", 95.0, 3.0, 35, 0.10, 3.0, "simplified common spec"],
    ["chatgpt-design-3", "simplified", "secondary timber", "25 x 38 mm", 24.0, 3.0, 9, 0.10, 3.0, "combined cleats plus stop battens"],
    ["claude-design-1", "original", "main framing", "47 x 75 mm CLS", 33.6, 2.4, 14, 0.10, 2.4, "source design gives 14 lengths at 2.4 m"],
    ["claude-design-1", "original", "main framing", "47 x 47 mm CLS", 28.8, 2.4, 12, 0.10, 2.4, "source design gives 12 lengths at 2.4 m"],
    ["claude-design-1", "original", "main framing", "75 x 75 mm PAR", 3.6, 2.4, 2, 0.10, 2.4, "source design gives 4 legs total 3.6 m"],
    ["claude-design-1", "original", "main framing", "47 x 100 mm CLS", 7.2, 2.4, 3, 0.10, 2.4, "source design gives 3 lengths at 2.4 m"],
    ["claude-design-1", "original", "secondary timber", "25 x 50 mm battens", 12.0, 2.0, 6, 0.10, 2.0, "source design gives 6 lengths at 2.0 m"],
    ["claude-design-1", "simplified", "main framing", "38 x 63 mm CLS", 73.2, 3.0, 27, 0.10, 3.0, "combined original main framing buckets"],
    ["claude-design-1", "simplified", "secondary timber", "25 x 38 mm", 12.0, 3.0, 5, 0.10, 3.0, "simplified common spec"],
    ["claude-design-2", "original", "main framing", "44 x 44 mm PAR softwood", 57.6, 2.4, 29, 0.10, 2.4, "source design rounds to 60 m and says order 29 lengths"],
    ["claude-design-2", "original", "main framing", "44 x 94 mm PAR softwood", 9.5, 2.4, 6, 0.10, 2.4, "source design rounds to 10 m and says order 6 lengths"],
    ["claude-design-2", "original", "secondary timber", "19 x 44 mm PAR batten", 9.0, 2.4, 5, 0.10, 2.4, "reconstructed from explicit batten uses in the design"],
    ["claude-design-2", "simplified", "main framing", "38 x 63 mm CLS", 70.0, 3.0, 26, 0.10, 3.0, "combined original main framing buckets"],
    ["claude-design-2", "simplified", "secondary timber", "25 x 38 mm", 9.0, 3.0, 4, 0.10, 3.0, "reconstructed from explicit batten uses in the design"],
    ["claude-design-3", "original", "main framing", "47 x 47 mm CLS", 22.47, 3.0, 9, 0.10, 3.0, "uprights plus top rails plus tool rail plus legs"],
    ["claude-design-3", "original", "secondary timber", "25 x 25 mm PAR", 22.8, 3.0, 9, 0.10, 3.0, "ledger strips plus corner ledgers"],
    ["claude-design-3", "original", "main framing", "47 x 97 mm CLS", 3.6, 3.0, 2, 0.10, 3.0, "workbench base rails"],
    ["claude-design-3", "original", "secondary timber", "25 x 50 mm PAR", 2.92, 2.4, 2, 0.10, 2.4, "tool-board standoff battens"],
    ["claude-design-3", "simplified", "main framing", "38 x 63 mm CLS", 26.05, 3.0, 10, 0.10, 3.0, "simplified common spec"],
    ["claude-design-3", "simplified", "secondary timber", "25 x 38 mm", 25.72, 3.0, 10, 0.10, 3.0, "simplified common spec"],
]


SHEET_ROWS = [
    ["chatgpt-design-1", "original", "18 mm plywood / OSB3", 4, 0, "source design"],
    ["chatgpt-design-1", "original", "12 mm plywood / OSB3", 2, 0, "source design"],
    ["chatgpt-design-1", "simplified", "18 mm structural plywood", 6, 0, "all sheet goods collapsed to 18 mm ply"],
    ["chatgpt-design-2", "original", "18 mm plywood", 4, 1, "source design says 4 minimum, 5 safer"],
    ["chatgpt-design-2", "original", "12 mm plywood or OSB3", 2, 0, "source design"],
    ["chatgpt-design-2", "simplified", "18 mm structural plywood", 6, 1, "6 minimum, 7 safer"],
    ["chatgpt-design-3", "original", "18 mm plywood", 4, 0, "source design"],
    ["chatgpt-design-3", "original", "18 mm OSB3 or extra plywood", 2, 0, "source design"],
    ["chatgpt-design-3", "original", "12 mm plywood", 1, 1, "source design says 1 to 2 sheets"],
    ["chatgpt-design-3", "simplified", "18 mm structural plywood", 7, 1, "7 minimum, 8 safer"],
    ["claude-design-1", "original", "18 mm structural plywood", 8, 0, "source design"],
    ["claude-design-1", "original", "12 mm birch plywood", 1, 0, "source design"],
    ["claude-design-1", "original", "18 mm OSB/3", 2, 0, "source design"],
    ["claude-design-1", "original", "contingency sheet", 11, 1, "source design says 11 sheets plus 1 contingency"],
    ["claude-design-1", "simplified", "18 mm structural plywood", 11, 1, "11 sheets plus original contingency"],
    ["claude-design-2", "original", "18 mm OSB/3", 7, 0, "source design"],
    ["claude-design-2", "original", "18 mm birch plywood", 2, 0, "source design"],
    ["claude-design-2", "simplified", "18 mm structural plywood", 9, 0, "all sheets collapsed to 18 mm ply"],
    ["claude-design-3", "original", "18 mm structural plywood", 6, 0, "source design"],
    ["claude-design-3", "original", "12 mm plywood", 1, 0, "source design"],
    ["claude-design-3", "simplified", "18 mm structural plywood", 7, 0, "all sheet goods collapsed to 18 mm ply"],
]


SUMMARY_ROWS = [
    ["chatgpt-design-1", "original"],
    ["chatgpt-design-1", "simplified"],
    ["chatgpt-design-2", "original"],
    ["chatgpt-design-2", "simplified"],
    ["chatgpt-design-3", "original"],
    ["chatgpt-design-3", "simplified"],
    ["claude-design-1", "original"],
    ["claude-design-1", "simplified"],
    ["claude-design-2", "original"],
    ["claude-design-2", "simplified"],
    ["claude-design-3", "original"],
    ["claude-design-3", "simplified"],
]


HEADER_FILL = PatternFill("solid", fgColor="D9EAF7")
TITLE_FILL = PatternFill("solid", fgColor="1F4E78")
TITLE_FONT = Font(color="FFFFFF", bold=True, size=14)
HEADER_FONT = Font(bold=True)
THIN_BORDER = Border(
    left=Side(style="thin", color="C7C7C7"),
    right=Side(style="thin", color="C7C7C7"),
    top=Side(style="thin", color="C7C7C7"),
    bottom=Side(style="thin", color="C7C7C7"),
)


def style_title(ws, cell_ref, text):
    cell = ws[cell_ref]
    cell.value = text
    cell.fill = TITLE_FILL
    cell.font = TITLE_FONT
    cell.alignment = Alignment(horizontal="left")


def style_headers(ws, row_num, headers):
    for idx, header in enumerate(headers, start=1):
        cell = ws.cell(row=row_num, column=idx, value=header)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.border = THIN_BORDER
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)


def apply_borders(ws, start_row, end_row, start_col, end_col):
    for row in ws.iter_rows(min_row=start_row, max_row=end_row, min_col=start_col, max_col=end_col):
        for cell in row:
            cell.border = THIN_BORDER
            if cell.column >= 1:
                cell.alignment = Alignment(vertical="top", wrap_text=True)


def set_widths(ws, widths):
    for col_idx, width in widths.items():
        ws.column_dimensions[get_column_letter(col_idx)].width = width


def build_guide_sheet(wb):
    ws = wb.active
    ws.title = "Guide"

    style_title(ws, "A1", "Shed Material Calculator")
    ws["A3"] = "What this workbook does"
    ws["A4"] = "1. Shows the source buy numbers currently captured from each design."
    ws["A5"] = "2. Lets you recalculate timber buy quantities using a waste % and stock length."
    ws["A6"] = "3. Lets you see original vs simplified totals side by side."
    ws["A8"] = "Core timber formula"
    ws["A9"] = "buy lengths = ROUNDUP((calculated linear metres x (1 + waste %)) / stock length, 0)"
    ws["A11"] = "Core sheet formula"
    ws["A12"] = "buy sheets = ROUNDUP(calculated sheets + safety extra sheets, 0)"
    ws["A14"] = "Important precision note"
    ws["A15"] = "The current design rows are not all equally precise. Some are cut-list style totals, others are design-stage estimates from the candidate writeups."
    ws["A17"] = "How to use this for a new design"
    ws["A18"] = "1. Add one row per timber section in the Timber Rows sheet."
    ws["A19"] = "2. Enter calculated linear metres for that section."
    ws["A20"] = "3. Set waste % and stock length."
    ws["A21"] = "4. Add one row per sheet type in the Sheet Rows sheet."
    ws["A22"] = "5. Set calculated sheets and any safety extra."
    ws["A24"] = "Interpretation"
    ws["A25"] = "Claude Design 3 is lower because it uses a lean upright-plus-ledger frame. The larger OpenAI totals come from fuller freestanding carcass-style framing, separate dock/bench frames, and more secondary members."

    for row in range(3, 26):
        ws[f"A{row}"].alignment = Alignment(wrap_text=True, vertical="top")

    set_widths(ws, {1: 120})


def build_timber_sheet(wb):
    ws = wb.create_sheet("Timber Rows")
    style_title(ws, "A1", "Timber Rows")

    headers = [
        "Design",
        "Version",
        "Bucket",
        "Section",
        "Calculated linear m",
        "Source stock length m",
        "Source buy lengths",
        "Source buy linear m",
        "Model waste %",
        "Model stock length m",
        "Model buy lengths",
        "Model buy linear m",
        "Notes",
    ]
    style_headers(ws, 3, headers)

    start_row = 4
    for idx, row in enumerate(TIMBER_ROWS, start=start_row):
        design, version, bucket, section, calc_m, source_stock, source_count, model_waste, model_stock, notes = row
        ws.cell(idx, 1, design)
        ws.cell(idx, 2, version)
        ws.cell(idx, 3, bucket)
        ws.cell(idx, 4, section)
        ws.cell(idx, 5, calc_m)
        ws.cell(idx, 6, source_stock)
        ws.cell(idx, 7, source_count)
        ws.cell(idx, 8, f"=IF(OR(F{idx}=\"\",G{idx}=\"\"),\"\",F{idx}*G{idx})")
        ws.cell(idx, 9, model_waste)
        ws.cell(idx, 10, model_stock)
        ws.cell(idx, 11, f"=IF(OR(E{idx}=\"\",I{idx}=\"\",J{idx}=\"\"),\"\",ROUNDUP((E{idx}*(1+I{idx}))/J{idx},0))")
        ws.cell(idx, 12, f"=IF(OR(J{idx}=\"\",K{idx}=\"\"),\"\",J{idx}*K{idx})")
        ws.cell(idx, 13, notes)

    apply_borders(ws, 3, start_row + len(TIMBER_ROWS) - 1, 1, len(headers))

    for row in range(start_row, start_row + len(TIMBER_ROWS)):
        ws.cell(row, 5).number_format = "0.00"
        ws.cell(row, 6).number_format = "0.00"
        ws.cell(row, 8).number_format = "0.00"
        ws.cell(row, 9).number_format = "0%"
        ws.cell(row, 10).number_format = "0.00"
        ws.cell(row, 12).number_format = "0.00"

    ws.freeze_panes = "A4"
    set_widths(
        ws,
        {
            1: 20,
            2: 12,
            3: 18,
            4: 34,
            5: 16,
            6: 18,
            7: 18,
            8: 18,
            9: 14,
            10: 18,
            11: 16,
            12: 18,
            13: 48,
        },
    )


def build_sheet_goods_sheet(wb):
    ws = wb.create_sheet("Sheet Rows")
    style_title(ws, "A1", "Sheet Goods Rows")

    headers = [
        "Design",
        "Version",
        "Material",
        "Calculated sheets",
        "Safety extra sheets",
        "Source / working buy sheets",
        "Model buy sheets",
        "Notes",
    ]
    style_headers(ws, 3, headers)

    start_row = 4
    for idx, row in enumerate(SHEET_ROWS, start=start_row):
        design, version, material, calc_sheets, safety_extra, notes = row
        ws.cell(idx, 1, design)
        ws.cell(idx, 2, version)
        ws.cell(idx, 3, material)
        ws.cell(idx, 4, calc_sheets)
        ws.cell(idx, 5, safety_extra)
        ws.cell(idx, 6, f"=ROUNDUP(D{idx}+E{idx},0)")
        ws.cell(idx, 7, f"=ROUNDUP(D{idx}+E{idx},0)")
        ws.cell(idx, 8, notes)

    apply_borders(ws, 3, start_row + len(SHEET_ROWS) - 1, 1, len(headers))
    ws.freeze_panes = "A4"
    set_widths(ws, {1: 20, 2: 12, 3: 32, 4: 16, 5: 18, 6: 22, 7: 18, 8: 44})


def build_summary_sheet(wb):
    ws = wb.create_sheet("Summary")
    style_title(ws, "A1", "Design Summary")

    headers = [
        "Design",
        "Version",
        "Source timber buy m",
        "Model timber buy m",
        "Source / working buy sheets",
        "Model buy sheets",
    ]
    style_headers(ws, 3, headers)

    start_row = 4
    for idx, row in enumerate(SUMMARY_ROWS, start=start_row):
        design, version = row
        ws.cell(idx, 1, design)
        ws.cell(idx, 2, version)
        ws.cell(idx, 3, f'=SUMIFS(\'Timber Rows\'!$H:$H,\'Timber Rows\'!$A:$A,A{idx},\'Timber Rows\'!$B:$B,B{idx})')
        ws.cell(idx, 4, f'=SUMIFS(\'Timber Rows\'!$L:$L,\'Timber Rows\'!$A:$A,A{idx},\'Timber Rows\'!$B:$B,B{idx})')
        ws.cell(idx, 5, f'=SUMIFS(\'Sheet Rows\'!$F:$F,\'Sheet Rows\'!$A:$A,A{idx},\'Sheet Rows\'!$B:$B,B{idx})')
        ws.cell(idx, 6, f'=SUMIFS(\'Sheet Rows\'!$G:$G,\'Sheet Rows\'!$A:$A,A{idx},\'Sheet Rows\'!$B:$B,B{idx})')

    apply_borders(ws, 3, start_row + len(SUMMARY_ROWS) - 1, 1, len(headers))

    for row in range(start_row, start_row + len(SUMMARY_ROWS)):
        ws.cell(row, 3).number_format = "0.00"
        ws.cell(row, 4).number_format = "0.00"

    ws.freeze_panes = "A4"
    set_widths(ws, {1: 20, 2: 12, 3: 18, 4: 18, 5: 20, 6: 18})


def main():
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    wb = Workbook()
    build_guide_sheet(wb)
    build_timber_sheet(wb)
    build_sheet_goods_sheet(wb)
    build_summary_sheet(wb)

    for ws in wb.worksheets:
        ws.sheet_view.showGridLines = True

    wb.save(OUTPUT_PATH)
    print(str(OUTPUT_PATH))


if __name__ == "__main__":
    main()
