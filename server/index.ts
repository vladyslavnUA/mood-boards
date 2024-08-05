import express from 'express';
import cors from 'cors';
import { createClient } from "@supabase/supabase-js";

const app = express();
const supabase = createClient("https://wxketljyiunzssitpzmu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4a2V0bGp5aXVuenNzaXRwem11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2MjI1NzcsImV4cCI6MjAzODE5ODU3N30.OrW59gG4C5u42pw3UPSG6rrx7GnYUApKEqT4FBCQ5mQ");

app.use(express.json());
app.use(cors());

app.get('/api/notes', async (req, res) => {
    res.json({msg: 'good'})
});

async function getNotes() {
    const { data } = await supabase.from("notes").select();
    console.log('data: ', data);
    // setNotes(data);
}

async function getUsers() {
const { data, error } = await supabase
  .from('profiles')
  .insert([
    { username: 'example', password: 'example' }, // replace with actual data
  ])
}

console.log('getUsers: ', getUsers());

app.listen(5000, () => {
    console.log('running localhost:5000')
});