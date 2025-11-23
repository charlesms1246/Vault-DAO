import axios from 'axios';
import { API_ENDPOINTS } from '@/lib/constants';

const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || '';

export async function fetchAddressTransactions(
  address: string,
  page: number = 1,
  offset: number = 10
) {
  try {
    const response = await axios.get(API_ENDPOINTS.ETHERSCAN, {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        page,
        offset,
        sort: 'desc',
        apikey: ETHERSCAN_API_KEY,
      },
    });

    if (response.data.status === '1') {
      return response.data.result;
    }
    return [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

export async function fetchERC20Transfers(
  address: string,
  contractAddress?: string,
  page: number = 1,
  offset: number = 10
) {
  try {
    const params: any = {
      module: 'account',
      action: 'tokentx',
      address,
      page,
      offset,
      sort: 'desc',
      apikey: ETHERSCAN_API_KEY,
    };

    if (contractAddress) {
      params.contractaddress = contractAddress;
    }

    const response = await axios.get(API_ENDPOINTS.ETHERSCAN, { params });

    if (response.data.status === '1') {
      return response.data.result;
    }
    return [];
  } catch (error) {
    console.error('Error fetching token transfers:', error);
    return [];
  }
}