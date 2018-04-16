import { RouterModule, Routes } from '@angular/router';
import { SiteBranch } from './branch/site/site.branch';
import { AdminBranch } from './branch/admin/admin.branch';

export const routes: Routes = [
    { path: 'admin', component: AdminBranch },
    {
        path: '', component: SiteBranch,
        children: [
            { path: 'mat', loadChildren: './family/mat/mat.family#MatFamily', data: { basePath: 'mat' } },
            { path: '', loadChildren: './family/bs3/bs3.family#bs3Family', data: { basePath: '' } },
            { path: 'sb', loadChildren: './family/sb/sb.family#SbFamily', data: { basePath: 'sb' } }
        ]
    }
];
