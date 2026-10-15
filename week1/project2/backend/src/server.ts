import {createApp} from './app'
import './config/env'


const PORT = process.env.PORT || 3001
const app = createApp();



app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})