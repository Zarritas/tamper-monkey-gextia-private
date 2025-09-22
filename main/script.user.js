// ==UserScript==
// @name         Acceso Privado Odoo v16
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Añade un botón para acceder con Gextia en la página de login de Odoo v16
// @author       You
// @match        *://*/web/login*
// @match        *://*/*/web/login*
// @icon         https://academy.factorlibre.com//web/image/website/1/favicon?unique=0bd9648
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    function isOdooV16LoginPage() {
        const loginForm = document.querySelector('.oe_login_form');
        const odooScript = document.querySelector('#web\\.layout\\.odooscript');
        return loginForm && odooScript;
    }
    async function getGextiaURL(){
        try {
            const response = await fetch(window.location.href.replace("web/login","web/login/private"));
            const html = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const gextiaButton = doc.querySelector('a.list-group-item')
            return gextiaButton
        } catch (error) {
            console.error('Error al obtener la página:', error)
            return null;
        }
    }
    async function addGextiaButton() {
        const url = ""
        const loginAuthContainer = document.querySelector('.o_login_auth');
        if (loginAuthContainer) {
            const authProvidersDiv = document.createElement('div');
            authProvidersDiv.className = 'o_auth_oauth_providers list-group mt-1 mb-1 text-start';
            const gextiaButton = await getGextiaURL();
            authProvidersDiv.appendChild(gextiaButton);
            loginAuthContainer.appendChild(authProvidersDiv);
        }
    }
    async function init() {
        if (isOdooV16LoginPage()) {
            await addGextiaButton();
            console.log('✅ Botón "Acceder con Gextia" añadido');
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
