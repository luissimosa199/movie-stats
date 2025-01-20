const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

// postgresql://luissimosaarg:fAwI0BbWKtS6@ep-mute-sun-a4twncsx.us-east-1.aws.neon.tech/movie-stats?sslmode=require
// PostgreSQL connection configuration
const pool = new Pool({
    connectionString: "postgresql://luissimosaarg:fAwI0BbWKtS6@ep-mute-sun-a4twncsx.us-east-1.aws.neon.tech/movie-stats?sslmode=require", // Use connection string with SSL mode
    ssl: {
        rejectUnauthorized: false,
    },
});


async function loadMovies() {
    try {
        const fileData = fs.readFileSync("db.json", "utf-8");
        const movies = JSON.parse(fileData);

        for (const movie of movies) {
            const { name, first_release_date, genres, overview, runtime, posters } = movie.meta;
            const watched_at = movie.watched_at;

            const poster_url = posters[0].url


            // Convert genres to PostgreSQL array literal
            const genresArray = genres.map((genre) => genre.replace(/"/g, '\\"')).join(",");

            const query = `
            INSERT INTO movies (title, release_date, genres, overview, runtime, poster_url, watched_at, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
          `;

            await pool.query(query, [
                name,
                first_release_date,
                genres, // Pass the genres array directly
                overview,
                runtime / 60,
                poster_url,
                watched_at,
            ]);

        }

        console.log("Movies stored successfully!");
    } catch (err) {
        console.error("Error storing movies:", err.message);
    } finally {
        pool.end();
    }
}

loadMovies();
