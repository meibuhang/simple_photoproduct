import axios from 'axios';
export const GET_ALLPHOTO = "GET_ALLPHOTO";
export const getPhoto = () => {
	return {
		type: GET_ALLPHOTO,
		payload: axios({
			method: 'GET',
			url: 'http://localhost:5000/api/mf/getphoto'
		})

		//payload bisa taruh di axios, tp taruh axios config
	};
};