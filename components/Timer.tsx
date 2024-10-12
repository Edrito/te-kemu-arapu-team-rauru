import React, { useEffect, useState } from "react";
import { Text } from "react-native";

interface TimerProps {
    newTime: number;
    onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ newTime, onTimeUp }: TimerProps) => {
    const [timeRemaining, setTimeRemaining] = useState(newTime);

    useEffect(() => {
        setTimeRemaining(newTime);

        // Set up the interval to update the timer every second
        const interval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(interval);
                    onTimeUp();
                    return prevTime;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [newTime, onTimeUp]);

    return (
        <Text className="text-[40px] m-2 p-6 border-2 border-dashed bg-orange-500">
            {timeRemaining}
        </Text>
    );
};