import { RouterModule, Routes } from '@angular/router';
import { SiteBranch } from './branch/site/site.branch';
import { AdminBranch } from './branch/admin/admin.branch';

export const routes: Routes = [
    { path: 'admin', component: AdminBranch },
    {
        path: '', component: SiteBranch,
        children: [
            { path: 'mat', loadChildren: './templates/mat/mat.template#MatTemplate', data: { basePath: 'mat' } },
            { path: '', loadChildren: './templates/bs3/bs3.template#bs3Template', data: { basePath: '' } },
            { path: 'sb', loadChildren: './templates/sb/sb.template#SbTemplate', data: { basePath: 'sb' } }
        ]
    }
];
