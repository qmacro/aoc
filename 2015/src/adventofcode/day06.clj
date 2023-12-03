(ns adventofcode.day06
  (:use [clojure.set])
  (:require [clojure.string :as str]))
  
;; Start with the input
(def in (-> "resources/day06input" slurp str/split-lines))

(defn coordblock
  "Produce the seq of x,y coords representing the
  two dimensional block of elements bounded by the
  coords of the two opposite corners of a rectangle.
  e.g. [0 0] [1 2] -> ([0 0] [1 0] [0 1] [1 1] [0 2] [1 2])"
  [[a b] [c d]]
  (for [y (range b (inc d))
        x (range a (inc c))]
   [x y])) 

(defn parseinstr
  "Parses one of the 3 types of light instructions:
  (turn on|turn off|toggle) a,b through c,d.
  e.g. 'toggle 171,31 through 688,88' -> ['toggle' (171 31) (688 88)]"
  [instr]
  (let [r (re-find #"^(turn on|turn off|toggle) (\d+?),(\d+?) through (\d+?),(\d+?)$" instr)]
    [(r 1)
     (map #(Integer. %) [(r 2) (r 3)])
     (map #(Integer. %) [(r 4) (r 5)])]))

(defn turn-on
  "Given an existing set of light coords and a list of light coords
  (ids) to turn on, return a new set representing the new combo of
  lights that are on."
  [s ids]
  (if (empty? ids) s (apply conj s ids)))

(defn turn-off
  "Given an existing set of light coords and a list of light coords
  (ids) to turn off, return a new set representing the new combo of
  lights that still remain on."
  [s ids]
  (difference s (set ids)))

(defn switch
  "Given an existing set of light coords representing lights that
  are on, and a pairing of operation and coords (ids) for that operation,
  apply the appropriate transformation. Note that toggling involves 
  turning lights off and then turning lights on, in that order."
  [s [op ids]]
  (case op
    "turn on" (turn-on s ids)
    "turn off" (turn-off s ids)
    "toggle" (let [to-turn-on (into [] (difference (set ids) s))
                   to-turn-off (into [] (intersection s (set ids)))]
               (turn-on (turn-off s to-turn-off) to-turn-on))))

(defn flatteninstr
  [[op start end]]
  (map #(vector op %) (coordblock start end))) 

(defn dec-to-zero [n] (max 0 (dec n)))

(defn newval
  [op oldval]
  (case op
    "turn on" (inc oldval)
    "turn off" (dec-to-zero oldval)
    "toggle" (+ oldval 2)))

(defn processinstr
  [map flatinstr]
  (loop [result map
         remaining flatinstr]
    (if (empty? remaining)
      result
      (let [[op coord] (first remaining)]
        (recur
          (assoc result coord (newval op (result coord 0)))
          (rest remaining))))))

(defn solve
  "..."
  [& args]
  (println

    ;; Part 1
    (count (reduce
      switch
      (set [])
      (->> in
           (map parseinstr)
           (map (fn [[op start end]] [op (coordblock start end)])))))

    ;; Part 2
    (let [allinstrs (->> in
                         (map parseinstr)
                         (map flatteninstr)
                         (apply concat))
          resultmap (processinstr {} allinstrs)
          total (reduce-kv (fn [t k v] (+ t v)) 0 resultmap)]
      total)

    ))
