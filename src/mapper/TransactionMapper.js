import axios from 'axios';

class TransactionMapper {
  constructor() {
    if (!TransactionMapper.instance) {
      this.baseURI = '/api/transactions';
      TransactionMapper.instance = this;
    }

    return TransactionMapper.instance;
  }

  async getTransactionListByUserId(userId) {
    try {
      const response = await axios.get(this.baseURI + '?userId=' + userId);
      if (response.status === 200) {
        return response.data;
      } else {
        alert('Transaction 조회 실패');
        return false;
      }
    } catch (error) {
      alert('에러발생 : ' + error);
    }
  }

  async deleteTransactionByTransactionId(id) {
    try {
      const response = await axios.delete(this.baseURI + `/${id}`);
      if (response.status === 200) {
        return response.data;
      } else {
        alert('Transaction 삭제 실패');
        return false;
      }
    } catch (error) {
      alert('에러발생 : ' + error);
    }
  }
}

const instance = new TransactionMapper();
export default instance;
