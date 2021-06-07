/* eslint-disable react/prop-types */
import { Typography } from '@material-ui/core';
import React from 'react'
import { getResults } from './playProvider'

export const ResultScreen = ({ playerID }) => {
    const [results, setResults] = React.useState(null)
    const [error, setError] = React.useState(false);
    React.useEffect(() => {
        (async () => {
            try {
                const resultData = await getResults(playerID);
                const playerResult = resultData.map(result => result.correct);
                console.log(playerResult);
                setResults(playerResult);
            } catch {
                setError(true);
            }
        })();
    }, [])
    return (
        <div>
            {results === null && error === false && 'Fetching results'}
            {error === true && 'Error fetching your results'}
            {results && (
                <>
                <Typography variant={'h5'}>
                    Your quiz results
                </Typography>
                <ol>
                        {results.map((result, index) =>
                            <li>Question {index}: {result ? 'correct' : 'incorrect'}</li>
                        )}
                </ol>
                </>
            )}
        </div>
    )
}
