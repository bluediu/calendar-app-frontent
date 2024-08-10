import Swal from 'sweetalert2';

import { AxiosResponse } from 'axios';

export const showError = (resp: AxiosResponse): void => {
  Swal.fire('Error', resp!.data.msg, 'error');
};
