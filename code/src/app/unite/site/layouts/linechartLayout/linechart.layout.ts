import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./linechart.layout.html",
    styleUrls: ['./linechart.layout.css']
})
export class LinechartLayout {
    @Input() data : Array<any>;
    @Input() set mapper(value){
        this.mapProperties(this.data, value);
    };

    localData;
    localMap;

    mapProperties(data, mapObj) {
        this.localMap = mapObj;


        let chekData : Array<any>= data['series'];

        let finalGraphD = [];
        for (var key in chekData)
        {
            if (chekData.hasOwnProperty(key))
            {

                let  bucket = chekData[key]['buckets'];

                let graphObj = {};
                graphObj['label'] = chekData[key]['name'];
                graphObj['data'] = [];

                bucket.forEach(element => {
                  graphObj['data'].push(element.value);
                });
                console.log(key + " -> ", graphObj);

                finalGraphD.push(graphObj);
            }
        }

        this.localData = finalGraphD;
    }


    public lineChartData:Array<any> = this.localData;
      public lineChartLabels:Array<any> = ['2018-01-04', '2018-01-05', '2018-01-06', '2018-01-07', '2018-01-8', '2018-01-09', '2018-01-10', '2018-01-11', '2018-01-12', '2018-01-13', '2018-01-14', '2018-01-15', '2018-01-16', '2018-01-17' ];
      public lineChartOptions:any = {
        responsive: true
      };
      public lineChartColors:Array<any> = [
        { // grey
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
      ];
      public lineChartLegend:boolean = true;
      public lineChartType:string = 'line';
     
      public randomize():void {
        let _lineChartData:Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
          _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
          for (let j = 0; j < this.lineChartData[i].data.length; j++) {
            _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
          }
        }
        this.lineChartData = _lineChartData;
      }
     
      // events
      public chartClicked(e:any):void {
        console.log(e);
      }
     
      public chartHovered(e:any):void {
        console.log(e);
      }
}