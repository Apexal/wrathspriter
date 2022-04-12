import { useCountdown } from "../../utils/hooks";

type CountdownButtonPropTypes = {
  seconds: number;
  onExecute: () => void;
  children: JSX.Element | JSX.Element[] | string;
};

export function CountdownButton(props: CountdownButtonPropTypes) {
  const [isCountingDown, secondsLeft, startCountdown, endCountdown] =
    useCountdown(props.seconds, props.onExecute);

  const handleClick = () => {
    if (isCountingDown) {
      endCountdown();
    } else {
      startCountdown();
    }
  };

  return (
    <button className="button" onClick={handleClick}>
      {isCountingDown ? secondsLeft : props.children}
    </button>
  );
}
