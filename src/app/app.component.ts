import { Component, OnInit } from '@angular/core';

declare var $, jQuery, w2ui;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Angular5 + W2UI';

    conf = {
        app_layout: {
            name: 'app_layout',
            style: 'background-color: #bbb;',
            panels: [
                { type: 'top', size: '20px', overflow: 'hidden', hidden: true },
                { type: 'main', overflow: 'hidden', style: 'background-color: white;' },
                { type: 'right', size: '37%', resizable: true },
                { type: 'bottom', size: '40px', hidden: false, content: 'Tribunal de Justiça do Amazonas - Divisão de Tecnologia da Informação e Comunicação (DVTIC) &copy; 2017', style: 'align: center; font-size: 8pt; font-weight: normal; color: #929292; text-align: center; vertical-align: middle; padding-top: 10px; border-top: #ddd 1px solid' }
            ]
        },

        app_toolbar: {
            name  : 'app_toolbar',
            items : [
                { id: 'home', caption: 'Sistema de Controle de Cadastro de Peritos', type: 'radio', icon: 'fa fa-user-secret' },
                { id: 'spacer1', type: 'spacer' },
                { id: 'user', caption: '--', type: 'menu',
                    items: [
                        { id: 'prefs', text: 'Preferências', icon: 'icon-cog' },
                        { id: 'break', text: '--' },
                        { id: 'logout', text: 'Logout', icon: 'icon-off' }
                    ]
                }
            ],
            onClick: this.action
        }
    }

    ngOnInit() {
        //this.init();
    }

    init(): void {
        $('#loading').css({ display: 'none', visibility: 'hidden' });
        $('#app-container').fadeIn(1000); 

        $('#app-toolbar').w2toolbar(this.conf.app_toolbar);
        $('#app-main').w2layout(this.conf.app_layout);
        
        w2ui.app_toolbar.set('user', { 
            text: 'Não conectado' 
        });
    }

    action() {
        alert('funfou');
    }
}
