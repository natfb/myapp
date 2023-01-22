import { useBox } from "@react-three/cannon";

const debug = false;
export default function ColiderBox({position, scale}) {
    useBox(() => ({
        args: scale,
        position,
        type: 'Static',
    }))

    return (
        debug && (
            <mesh position={position}>
                <boxGeometry args={scale}/>
                <meshBasicMaterial transparent={true} opacity={1} color={"#FF0000"}/>
            </mesh>
        )
    )
}