import { createApp, defineCustomElement } from "vue"

import "@app/css/global.css"
import App from './App.vue'

import "@common/components/footballPitch"

import HelloWorld from "@app/components/HelloWorld.vue"
customElements.define('hello-world', defineCustomElement(HelloWorld))

createApp(App).mount('#app')
