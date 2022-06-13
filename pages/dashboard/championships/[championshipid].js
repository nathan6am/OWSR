import React from "react";

//components
import Loading from "@/components/Loading";
import ChampTabs from "@/components/dashboard/ChampTabs";
import GameLogo from "@/components/GameLogo";
import ErrorMessage from "@/components/ErrorMessage";

//hooks
import useSWR from "swr";

//util
import { fetcher } from "@/lib/fetcher";

export default function ChampionshipDetails({ championshipid }) {
  const { data, mutate, error, isValidating } = useSWR(
    `/api/championships/${championshipid}`,
    fetcher
  );
  const championship = data && data.championship;
  return (
    <>
      {error ? (
        <ErrorMessage />
      ) : (
        <>
          {!data ? (
            <div className="min-h-screen flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <>
              <ChampBanner championship={championship} />
              <section className="container">
                <ChampTabs championship={championship} />
              </section>
            </>
          )}
        </>
      )}
    </>
  );
}

ChampionshipDetails.layout = "Dashboard";

ChampionshipDetails.getInitialProps = async ({ query }) => {
  const { championshipid } = query;
  return {
    championshipid,
  };
};

function ChampBanner({ championship }) {
  return (
    <div
      className="w-full bg-cover h-80 relative overflow-hidden"
      style={{
        backgroundImage: `url(${championship.image})`,
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full image-gradient p-8">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-center">
            {championship.title}
          </h1>

          <div>
            <GameLogo
              className="absolute bottom-2 right-4 my-3"
              width="200"
              game={championship.game}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
