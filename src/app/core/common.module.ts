import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableCellFormatPipe } from './table/TableCellFormatPipe';
import { TableCellStyleDirective } from './table/table-cell.style.directive';
import { ButtonComponent } from './button/button.component';
import { SelectComponent } from './select/select-component';
import { GaugeChartComponent } from './chart/gauge/gauge.component';
import { ScatterPlotComponent } from './chart/scatter/scatter.plot.';
import { LineChartComponent } from './chart/Line/line-chart.component';
import { PieChartComponent } from './chart/Pie/pie-chart.component';
import { ColumnChartComponent } from './chart/column/column-chart.component';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './datepicker/datepicker.component';
import { SideNavigationPanelComponent } from './sidenavpanel/side.navigation.panel';
import { SideNavigationPanelSvc } from './sidenavpanel/sidenavigationpanelsvc';
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    TableComponent,
    TableCellFormatPipe,
    TableCellStyleDirective,
    ButtonComponent,
    SelectComponent,
    PieChartComponent,
    ColumnChartComponent,
    GaugeChartComponent,
    ScatterPlotComponent,
    LineChartComponent,
    DatePickerComponent,
    SideNavigationPanelComponent,
  ],
  exports: [
    CommonModule,
    TableComponent,
    TableCellFormatPipe,
    TableCellStyleDirective,
    ButtonComponent,
    SelectComponent,
    PieChartComponent,
    ColumnChartComponent,
    GaugeChartComponent,
    ScatterPlotComponent,
    LineChartComponent,
    DatePickerComponent,
    SideNavigationPanelComponent,
    // SideNavigationPanelSvc
  ]
})
export class AppCommonModule {}
