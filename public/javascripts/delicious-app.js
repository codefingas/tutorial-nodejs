import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';

autocomplete( $('#adress'), $('#lat'), $('#lng'))