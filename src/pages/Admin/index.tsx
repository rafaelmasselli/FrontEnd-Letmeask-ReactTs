import { FormEvent, useEffect, useState } from "react";

import LogoImage from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";

import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";

import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { useRoom } from "../../hooks/useRoom";

import "../Room/index";
import { useNavigate, useParams } from "react-router-dom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();

  const params = useParams<RoomParams>();
  const roomId = params.id;
  const Navigate = useNavigate();

  const [newQuestion, setNewQuestion] = useState("");

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    Navigate("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      const questionRef = await database
        .ref(`rooms/${roomId}/questions/${questionId}`)
        .remove();
    }
  }

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref("rooms/" + roomId + "/questions").push(question);
    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImage} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          <span>
            {questions.length > 0 && (
              <span>
                {questions.length > 1
                  ? questions.length + " perguntas"
                  : questions.length + " pergunta"}
              </span>
            )}
          </span>
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                content={question.content}
                author={question.author}
                key={question.id}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
