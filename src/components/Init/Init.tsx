import InitField from '../InitField/InitField';

const Init = ({ setIsInit }: {
    setIsInit: Function
}) => {

    return (
        <div>
            <div><InitField setIsInit= {setIsInit}/></div>
        </div>
    )
}

export default Init;