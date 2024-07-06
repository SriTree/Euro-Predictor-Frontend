"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Import flag images
// test
import albaniaFlag from "../app/assets/albania.png";
import austriaFlag from "../app/assets/austria.png";
import belgiumFlag from "../app/assets/belgium.png";
import croatiaFlag from "../app/assets/croatia.png";
import czechiaFlag from "../app/assets/czechia.png";
import denmarkFlag from "../app/assets/denmark.png";
import englandFlag from "../app/assets/england.png";
import franceFlag from "../app/assets/france.png";
import georgiaFlag from "../app/assets/georgia.png";
import germanyFlag from "../app/assets/germany.png";
import hungaryFlag from "../app/assets/hungary.png";
import italyFlag from "../app/assets/italy.png";
import netherlandsFlag from "../app/assets/netherlands.png";
import polandFlag from "../app/assets/poland.png";
import portugalFlag from "../app/assets/portugal.png";
import romaniaFlag from "../app/assets/romania.png";
import scotlandFlag from "../app/assets/scotland.png";
import serbiaFlag from "../app/assets/serbia.png";
import slovakiaFlag from "../app/assets/slovakia.png";
import sloveniaFlag from "../app/assets/slovenia.png";
import spainFlag from "../app/assets/spain.png";
import switzerlandFlag from "../app/assets/switzerland.png";
import turkeyFlag from "../app/assets/turkey.png";
import ukraineFlag from "../app/assets/ukraine.png";

type StaticImageData = {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
};

interface GroupStageResult {
  match: string;
  winner: string;
  result: string;
}

interface GroupStandings {
  [key: string]: Array<[string, { points: number }]>;
}

interface Top2Teams {
  [key: string]: Array<[string, { points: number }]>;
}

interface Match {
  round: number;
  opponent1_id: number;
  opponent2_id: number;
  opponent1_score: number;
  opponent2_score: number;
}

interface Participant {
  id: number;
  name: string;
  flag: string;
}

interface TournamentData {
  group_stage_results: GroupStageResult[];
  group_standings: GroupStandings;
  top_2_teams: Top2Teams;
  best_4_third_placed: string[];
  matches: Match[];
  participants: Participant[];
  final_winner: string;
  accuracy: number;
  precision: number;
}

const fetchResults = async (): Promise<TournamentData> => {
  const response = await fetch("https://euro-predictor.onrender.com/simulate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const retrainModel = async (): Promise<void> => {
  const response = await fetch("https://euro-predictor.onrender.com/retrain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const flagImages: { [key: string]: StaticImageData } = {
  albania: albaniaFlag,
  austria: austriaFlag,
  belgium: belgiumFlag,
  croatia: croatiaFlag,
  czechia: czechiaFlag,
  denmark: denmarkFlag,
  england: englandFlag,
  france: franceFlag,
  georgia: georgiaFlag,
  germany: germanyFlag,
  hungary: hungaryFlag,
  italy: italyFlag,
  netherlands: netherlandsFlag,
  poland: polandFlag,
  portugal: portugalFlag,
  romania: romaniaFlag,
  scotland: scotlandFlag,
  serbia: serbiaFlag,
  slovakia: slovakiaFlag,
  slovenia: sloveniaFlag,
  spain: spainFlag,
  switzerland: switzerlandFlag,
  turkey: turkeyFlag,
  ukraine: ukraineFlag,
  // Add other mappings as needed
};

const Bracket: React.FC<{ data: TournamentData }> = ({ data }) => {
  const getParticipantById = (id: number) => {
    return data.participants.find((p) => p.id === id);
  };

  const getFlag = (participantName: string) => {
    return flagImages[participantName.toLowerCase().replace(/ /g, "_")];
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white p-4 relative">
      <div className="flex justify-center">
        <h1 className="text-5xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
          UEFA European Championship 2024 Predictor
        </h1>
      </div>

      <div className="flex flex-wrap justify-center mt-8 space-x-7">
        <div className="flex flex-col space-y-10">
          {/* Left Round of 16 */}
          {data.matches.slice(0, 4).map((match, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24 mb-4">
                <span>{getParticipantById(match.opponent1_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent1_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24">
                <span>{getParticipantById(match.opponent2_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent2_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-10">
          {/* Quarterfinals - Left */}
          {data.matches.slice(8, 10).map((match, index) => (
            <div key={index} className="flex flex-col items-start mb-48">
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24 mb-36 mt-16">
                <span>{getParticipantById(match.opponent1_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent1_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24 -mb-36">
                <span>{getParticipantById(match.opponent2_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent2_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-10">
          {/* Semifinals - Left */}
          {data.matches.slice(12, 13).map((match, index) => (
            <div key={index} className="flex flex-col items-end mb-36">
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24 mb-96 mt-48">
                <span>{getParticipantById(match.opponent1_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent1_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24">
                <span>{getParticipantById(match.opponent2_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent2_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-10">
          {/* Finals - Left */}
          {data.matches.slice(14).map((match, index) => (
            <div key={index} className="flex flex-col items-end mb-36 mt-96">
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24 mt-12">
                <span>{getParticipantById(match.opponent1_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent1_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-10">
          {/* Finals - Right */}
          {data.matches.slice(14).map((match, index) => (
            <div key={index} className="flex flex-col items-end mb-36 mt-96">
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24 mt-12">
                <span>{getParticipantById(match.opponent2_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent2_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-10">
          {/* Semifinals - Right */}
          {data.matches.slice(13, 14).map((match, index) => (
            <div key={index} className="flex flex-col items-end mb-36">
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24 mb-96 mt-48">
                <span>{getParticipantById(match.opponent1_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent1_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24">
                <span>{getParticipantById(match.opponent2_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent2_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-10">
          {/* Quarterfinals - Right */}
          {data.matches.slice(10, 12).map((match, index) => (
            <div key={index} className="flex flex-col items-end mb-48">
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24 mb-36 mt-16">
                <span>{getParticipantById(match.opponent1_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent1_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24 -mb-36">
                <span>{getParticipantById(match.opponent2_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent2_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-10">
          {/* Right Round of 16 */}
          {data.matches.slice(4, 8).map((match, index) => (
            <div key={index} className="flex flex-col items-end">
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24 mb-4">
                <span>{getParticipantById(match.opponent1_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent1_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
              <div className="bg-white text-black p-1 rounded-md flex items-center justify-between w-36 h-24">
                <span>{getParticipantById(match.opponent2_id)?.name}</span>
                <Image
                  src={
                    getFlag(getParticipantById(match.opponent2_id)?.name || "")
                      .src
                  }
                  alt="flag"
                  width={45}
                  height={45}
                  className="rounded-full mr-.5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TournamentResults: React.FC = () => {
  const [data, setData] = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retrainLoading, setRetrainLoading] = useState(false);
  const [retrainError, setRetrainError] = useState<string | null>(null);

  const fetchResultsData = () => {
    setLoading(true);
    setError(null);
    fetchResults()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch results");
        setLoading(false);
        console.error(err);
      });
  };

  const handleRetrain = async () => {
    setRetrainLoading(true);
    setRetrainError(null);
    try {
      await retrainModel();
      const newData = await fetchResults();

      if (newData.accuracy < 0.65 || newData.precision < 0.65) {
        setData(newData);
        handleRetrain();
      } else {
        setData(newData);
        setRetrainLoading(false);
      }
    } catch (err) {
      setRetrainError("Failed to retrain model");
      setRetrainLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResultsData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return data ? (
    <>
      <Bracket data={data} />
      <div className="p-10 bg-blue-900 text-white">
        <h2 className="text-3xl mb-4">Group Stage Results</h2>
        <div className="flex flex-wrap">
          {data.group_stage_results.map((result, index) => (
            <div key={index} className="bg-blue-400 m-2 p-4 rounded-md">
              <p>
                <strong>Match:</strong> {result.match}
              </p>
              <p>
                <strong>Winner:</strong> {result.winner}
              </p>
              <p>
                <strong>Result:</strong> {result.result}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-10 bg-blue-900 text-white">
        <h2 className="text-3xl mb-4">Group Standings</h2>
        {Object.keys(data.group_standings).map((group, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-2xl mb-2">Group {group}</h3>
            <div className="flex flex-wrap">
              {data.group_standings[group].map(([team, stats], idx) => (
                <div key={idx} className="bg-blue-400 m-2 p-4 rounded-md">
                  <p>
                    <strong>Team:</strong> {team}
                  </p>
                  <p>
                    <strong>Points:</strong> {stats.points}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="p-10 bg-blue-900 text-white">
        <h2 className="text-3xl mb-4">Model Performance</h2>
        <p>
          <strong>Accuracy:</strong> {data.accuracy.toFixed(2)}
        </p>
        <p>
          <strong>Precision:</strong> {data.precision.toFixed(2)}
        </p>
        <button
          onClick={handleRetrain}
          disabled={retrainLoading}
          className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-md"
        >
          {retrainLoading ? "Retraining..." : "Retrain Model"}
        </button>
        {retrainError && <p className="text-red-500 mt-2">{retrainError}</p>}
        {data.accuracy <= 0.62 && (
          <p className="text-red-500 mt-2">Accuracy is less than 0.62</p>
        )}
        {data.precision <= 0.62 && (
          <p className="text-red-500 mt-2">Precision is less than 0.62</p>
        )}
      </div>
    </>
  ) : null;
};

const App: React.FC = () => {
  return <TournamentResults />;
};

export default App;
