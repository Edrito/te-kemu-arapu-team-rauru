
import { Text } from "react-native";
import React from "react";
import { useEffect, useState } from "react";

interface TimerProps {
    newTime: number;
    onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = (props: TimerProps) => {
    const [timeRemaining, setTimeRemaining] = useState(props.newTime);

    setTimeRemaining(props.newTime);

    useEffect(() => {
        // Update timeRemaining every second
        const interval = setInterval(() => {
            setTimeRemaining(prevTime => Math.max(prevTime - 1, 0));
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (<Text className="text-[40px] m-2 p-6 border-2 border-dashed bg-orange-500">
        {timeRemaining}
    </Text>);
}
