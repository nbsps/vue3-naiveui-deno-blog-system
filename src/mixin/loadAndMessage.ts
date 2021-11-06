import { sRequest } from '@/service';

export default {
  mounted(): void {
    sRequest.setLoadAndMessage();
  },
};
