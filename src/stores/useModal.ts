import { markRaw } from "vue";
import { defineStore } from "pinia";

export type Modal = {
    isOpen: boolean,
    view: object,
    data: object,
};

export const useModal = defineStore("modal", {
    state: (): Modal => ({
        isOpen: false,
        view: {},
        data: {},
    }),
    actions: {
        open(view: object, data: object = {}) {
            this.isOpen = true;
            // using markRaw to avoid over performance as reactive is not required
            this.view = markRaw(view);
            this.data = data;
        },
        close() {
            this.isOpen = false;
            this.view = {};
        },
    },
});

export default useModal;
