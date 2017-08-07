import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerListComponent }          from '../components/player-list/player-list.component';
import { MatchReportComponent }         from '../components/match-report/match-report.component';
import { ViewTiersComponent }           from '../components/view-tiers/view-tiers.component';
import { AddPlayerComponent }           from '../components/add-player/add-player.component';
import { LogInComponent }               from "../components/log-in/log-in.component";
import { EventManagerComponent }        from "../components/event-manager/event-manager.component";
import { ViewMatchesComponent }         from "../components/view-matches/view-matches.component";

const routes: Routes = [
    { path: '', redirectTo: '/players', pathMatch: 'full' },
    { path: 'players',  children:
        [
            { path: '', component: PlayerListComponent, pathMatch: 'full' }

        ]
    },
    { path: 'report/:p1/:p2', children:
        [
            { path: '', component: MatchReportComponent, pathMatch: 'full' }
        ]
    },
    { path: 'tiers', children:
        [
            { path: '', component: ViewTiersComponent, pathMatch: 'full' }
        ]
    },
    { path: 'add_player', children:
        [
            { path: '', component: AddPlayerComponent, pathMatch: 'full' }
        ]
    },
    { path: 'login', children:
        [
            { path: '', component: LogInComponent, pathMatch: 'full' }
        ]
    },
    { path: 'events', children:
        [
            { path: '', component: EventManagerComponent, pathMatch: 'full' }
        ]
    },
    { path: 'matches', children:
        [
            { path: '', component: ViewMatchesComponent, pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class RoutingModule {}
