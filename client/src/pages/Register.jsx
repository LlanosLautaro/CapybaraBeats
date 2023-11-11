import { useFetch } from "../useFetch";

export function Register(){
  const {data} = useFetch("http://127.0.0.1:8000/music/list/")

  
  return(
    <div classname="xd">
      {
        data?.map((song)=> (
          <li key = {song.id}> {song.title}    </li>
        )
        )
      }
    </div>
  );
};
