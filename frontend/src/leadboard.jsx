import { useEffect, useState } from "react";
import "./leaderboard.css";
function Leaderboard() {
  const placeholderTeams = [
    { team_name: "team1", total_gems: 0, total_points: 0 },
    { team_name: "team2", total_gems: 0, total_points: 0 },
    { team_name: "team3", total_gems: 0, total_points: 0 },
    { team_name: "team4", total_gems: 0, total_points: 0 },
    { team_name: "team5", total_gems: 0, total_points: 0 },
  ];

  const [teams, setTeams] = useState(placeholderTeams);
  const [unauthenticated, setUnauthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("access_token");
        console.log("Token exists:", !!token);

        if (!token) {
          setUnauthenticated(true);
          setLoading(false);
          return;
        }

        console.log("Fetching from API...");
        const res = await fetch("https://cic-opening-day-backend.onrender.com/api/game/leaderboard/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", res.status);

        if (res.status === 401) {
          setUnauthenticated(true);
          setLoading(false);
          return;
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Received data:", data);
        console.log("Data is array:", Array.isArray(data));
        console.log("Data length:", data?.length);

        if (Array.isArray(data) && data.length > 0) {
          setTeams(data);
          setUnauthenticated(false);
        } else {
          console.warn("API returned empty or invalid data");
          setError("No teams found in the database.");
        }
      } catch (error) {
        console.error("FETCH ERROR:", error);
        console.error("Error details:", {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
        setError(`Server error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSet();
    const interval = setInterval(fetchAndSet, 30000);
    return () => clearInterval(interval);
  }, []);

  const safeTeams = Array.isArray(teams) ? teams : [];
  const sortedTeams = [...safeTeams].sort((a, b) => {
    if (b.total_gems === a.total_gems) return b.total_points - a.total_points;
    return b.total_gems - a.total_gems;
  });

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-wrapper" style={{ padding: "30px" }}>
        <img src="/dec.png" className="leaderboard-logo" alt="logo" />

        {loading && (
          <div style={{ color: "white", background: "#5bc0de", padding: 8, marginBottom: 12 }}>
            Loading leaderboard...
          </div>
        )}

        {unauthenticated && (
          <div style={{ color: "white", background: "#d9534f", padding: 8, marginBottom: 12 }}>
            You are not logged in — leaderboard requires login.
          </div>
        )}

        {error && (
          <div style={{ color: "black", background: "#ffd966", padding: 8, marginBottom: 12 }}>
            {error}
          </div>
        )}

        <table className="leaderboard-table">
          <tbody>
            <tr className="leaderboard-title-row">
              <td colSpan="4" className="leaderboard-title-cell">
                <h1 className="leaderboard-title">Leaderboards</h1>
                <div className="leaderboard-divider"></div>
              </td>
            </tr>

            {sortedTeams.map((team, index) => (
              <tr key={team.team_name + index} className={index < 5 ? "top-row" : ""}>
                <td className="col-rank">
                  {index <= 4 ? (
                    <img
                      src={
                        index === 0 ? "/medals/gold.png" :
                        index === 1 ? "/medals/silver.png" :
                        index === 2 ? "/medals/bronze.png" :
                        index === 3 ? "/medals/fourth.png" :
                        "/medals/fifth.png"
                      }
                      alt={`rank-${index + 1}`}
                      className={`medal ${index <= 2 ? "top-three" : "top-five"}`}
                    />
                  ) : (
                    index + 1
                  )}
                </td>

                <td className="col-team">{team.team_name}</td>
                <td className="col-gems">💎 {team.total_gems}</td>
                <td className="col-points">points : {team.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;