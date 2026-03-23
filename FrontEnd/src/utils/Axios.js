import axios from "axios"
import { baseUrl } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseUrl,
});

export default Axios;