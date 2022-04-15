import axios from 'axios';
import { API_GATEWAY_PATH } from '@app/constants';

export const API = abortController => axios.create({ signal: abortController?.signal, baseURL: API_GATEWAY_PATH });
