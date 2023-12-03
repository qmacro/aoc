(ns adventofcode.day03
  (:require [clojure.string :as str]))
  
;; Start with the input
(def in (-> "resources/day03input" slurp str/trim-newline))

(def dircoord
  "Mapping of directions to relative coordinates"
  {\^ [1 0]
   \v [-1 0]
   \> [0 1]
   \< [0 -1]})

(defn gencoords
  "Create seq of relative coords from string of input
  directions.
  Example: ^^^<v -> [[1 0] [1 0] [1 0] [0 -1] [-1 0]]"
  [dirstring]
  (map #(dircoord %) (seq dirstring)))

(defn visitedlocs
  "Create seq of visited location coords, given a
  starting coord and a seq of relative coords.
  Example: [1 1] [[1 0] [1 0] [0 1]] -> [[1 1] [2 1] [3 1] [3 0]]"
  [start relcoords]
  (reductions #(map + %1 %2) start relcoords))

(defn solve
  "..."
  [& args]
  (let [relcoords (gencoords in)
        santacoords (take-nth 2 relcoords)
        robocoords (take-nth 2 (rest relcoords))]

    ;; Part 1
    (println (->> relcoords
                  (visitedlocs [1 1])
                  set
                  count))

    ;; Part 2
    (println (->
               (concat
                 (visitedlocs [1 1] santacoords)
                 (visitedlocs [1 1] robocoords))
               set
               count))

    ))
