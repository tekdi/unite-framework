import { OneTemplate } from './1/one.template';
import { TwoTemplate } from './2/two.template';

export const matRenderersMapper = {
    'one' : OneTemplate,
    'two' : TwoTemplate
};

export const matRenderers = [OneTemplate, TwoTemplate]