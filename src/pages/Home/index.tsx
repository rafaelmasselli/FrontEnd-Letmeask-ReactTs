import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import Illustration from "../../assets/images/illustration.svg";
import LogoImg from "../../assets/images/logo.svg";
import GoogleIcon from "../../assets/images/google-icon.svg";

import "./styles.scss";
import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

export function Home() {
  const [roomCode, setRoomCode] = useState("");
  const { signInWithGoogle, user } = useAuth();

  const Navigation = useNavigate();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    Navigation("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if(roomCode.trim() === ""){
      return 
    }

    const roomRef = await database.ref('rooms/' + roomCode).get()

    if(!roomRef.exists()){
      alert("Room does not existe.");
      return
    }

  if(roomRef.val().endedAT){
   alert("room already closed.")
   return 
  }

    Navigation("rooms/" + roomCode)
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={Illustration}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={LogoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={GoogleIcon} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
