'use client';

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "@/api/axios";


export default function Home() {
  const [ data, setData ] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get('/', { withCredentials: true });

      if (res.status === 200) {
        setData(res.data[0].test);
      }
    } catch (err) {
      alert('Brak odpowiedzi serwera. Skontaktuj się z administratorem.');
      console.error(err);
    } 
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        Jesteś na stronie głownej
      </div>
      <div>
        Pobrane z bazy danych: {data}
      </div>
    </>
  );
}
