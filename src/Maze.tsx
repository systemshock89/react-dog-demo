import { fieldSize, maxWallLength, minWallLength } from './constants'
import { parrotsToPixels } from './units'
import { useCallback, useState, useRef } from 'react'
import styles from './Maze.module.css'
import { Dog } from './Dog'

type Wall = {
    left: number
    width: number
}

const randomInt = (minVal: number, maxVal: number) =>
    Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal

const generateNewWall = (): Wall => {
    const width = randomInt(minWallLength, maxWallLength)
    const alignLeft = Math.random() > 0.5

    return {
        left: alignLeft ? 0 : fieldSize - width,
        width,
    }
}

type Point = {
    x: number
    y: number
}
const generatePathAroundWalls = (
    walls: Wall[],
    start: Point,
    end: Point,
): Point[] => {
    const path = [start]
    const reversedWalls = walls.reverse()
    let currentY = start.y
    path.push({ ...start })

    while (reversedWalls.length) {
        const wall = reversedWalls.pop() as Wall
        currentY++

        if (wall.width === 0) {
            continue
        }

        if (wall.left === 0) {
            path.push({ x: wall.width + 0.5, y: currentY })
        } else {
            path.push({ x: 0, y: currentY })
        }
    }

    path.push(end)
    return path
}

const generateKeyframes = (path: Point[]) =>
    path.map(({ x, y }) => ({
            transform: `translate(${parrotsToPixels(x)}px, ${parrotsToPixels(y)}px)`,
        })
    )

export const Maze = () => {
    const size = parrotsToPixels(fieldSize)
    const [walls, setWalls] = useState<Wall[]>(() =>
        Array.from({ length: fieldSize }, () => ({
            left: 0,
            width: 0,
        })),
    )

    const dogRef = useRef<HTMLDivElement | null>(null)

    const toggleWall = useCallback((mazeRow: number) => {
        setWalls((walls) =>
            walls.map((wall, i) => {
                if (i === mazeRow) {
                    if (wall.width === 0) {
                        return generateNewWall()
                    } else {
                        return {
                            left: 0,
                            width: 0,
                        }
                    }
                }
                return wall
            }),
        )
    }, [])

    const getBall = useCallback(() => {
        const start = { x: 0, y: 0 } // 🐶

        const end = { x: 0, y: fieldSize + 1 } // 🎾

        const path = generatePathAroundWalls(walls, start, end)
        dogRef.current?.animate(generateKeyframes(path), {
            duration: 3000,
            easing: 'linear',
            fill: 'forwards',
        })
    }, [walls])

    return (
        <>
            <button onClick={getBall}>Апорт!</button>
            <Dog ref={dogRef} />
            {/* 🐶 */}
            <div
                style={{
                    width: size,
                    height: size,
                }}
                className={styles.maze}
            >
                {Array.from({ length: fieldSize }, (_, i) => (
                    <button
                        key={i}
                        style={{ height: parrotsToPixels(1) }}
                        className={styles.button}
                        onClick={() => toggleWall(i)}
                    >
            <span
                className={styles.wall}
                style={{
                    width: parrotsToPixels(walls[i].width),
                    left: parrotsToPixels(walls[i].left),
                }}
            />
                    </button>
                ))}
            </div>
        </>
    )
}
