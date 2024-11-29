import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'


export const usePieChart = defineStore("pieChart", {
    state: () => ({
        currentChart: useStorage('current-chart', {
            id: 0,
            type: 'pie',
            title: 'Круговая диаграма',
            dataset: [
                {
                    id: 0,
                    label: 'Сектор 1',
                    backgroundColor: 'rgb(241, 98, 126)',
                    data: 25
                },
                {
                    id: 1,
                    label: 'Сектор 2',
                    backgroundColor: 'rgb(122,241,98)',
                    data: 55
                },
                {
                    id: 2,
                    label: 'Сектор 3',
                    backgroundColor: 'rgb(29,112,216)',
                    data: 90
                }
            ]
        })
    }),
    getters: {
        parsedData: (state) => {
            const dataset = state.currentChart.dataset
            let labels = []
            let backgroundColor = []
            let data = []

            for (let i = 0; i < dataset.length; i++) {
                const el = dataset[i]
                labels.push(el.label)
                backgroundColor.push(el.backgroundColor)
                data.push(el.data)
            }

            return {
                labels,
                datasets: [
                    {
                        backgroundColor,
                        data
                    }
                ]
            }
        },
        chartDataLength: (state) => {
            return state.currentChart.dataset.length
        },
        getSectorById: (state) => {
            return (id) => state.currentChart.dataset.find(obj => obj.id === id)
        },
    },
    actions: {
        addNewSector(dataObj) {
            this.currentChart.dataset.push(dataObj)
        },
        deleteSectorById(id) {
            this.currentChart.dataset = this.currentChart.dataset.filter(obj => obj.id !== id);
        },
        editSectorById(id, newObj){
            const index = this.currentChart.dataset.findIndex(obj => obj.id === id)
            this.currentChart.dataset[index] = newObj
        }
    }
});

export default usePieChart;
