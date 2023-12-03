(ns adventofcode.day15
  (:require [clojure.string :as str]))

(defn vals-to-mapentry
  "Turns a seq of two strings to a map entry.
  E.g. ('capacity', '-3') -> {:capacity -3}"
  [[keystr valstr]]
  {(keyword keystr) (Integer. valstr)})

(defn parse-ingredient
  "Given an ingredient info string, returns the pairs
  of features and values. E.g.
  'Sugar: capacity 3, durability 0, flavor 0, texture -3, calories 2' ->
  (('capacity' '3') ('durability' '0') ('flavor' '0') ('texture' '-3') ('calories' '2'))"
  [in]
  (map rest (re-seq #"(?: (\w+?) (-?\d+)+)" in)))

(def facts
  "Parse input to produce a list of ingredient 'fact' maps."
  (->> "resources/day15input"
       slurp
       str/split-lines
       (map parse-ingredient)          ;; create feature/value pairs
       (map #(map vals-to-mapentry %)) ;; form keyword/int map entries from them
       (map #(into {} %))))            ;; then put into a single map per ingredient


(defn four-combos
  "Returns a seq of the unique 4 ingredient combos for
  a given number of spoons. E.g. for 3 spoons, returns:
  ([0 0 0 3] [0 0 1 2] [0 0 2 1] [0 0 3 0] [0 1 0 2] [0 1 1 1]
  [0 1 2 0] [0 2 0 1] [0 2 1 0] [0 3 0 0] [1 0 0 2] [1 0 1 1]
  [1 0 2 0] [1 1 0 1] [1 1 1 0] [1 2 0 0] [2 0 0 1] [2 0 1 0]
  [2 1 0 0] [3 0 0 0])"
  [spoons]
  (for [a (range (inc spoons))
        b (range (inc (- spoons a)))
        c (range (inc (- spoons a b)))]
    [a b c (- spoons a b c)]))

(defn feature-score
  "Return the score for a certain feature, given
  the spoons of ingredients."
  [feature spoons ingredients]
  (->> ingredients
       (map feature)
       (map * spoons)
       (apply +)
       (max 0)))


(def key-features [:capacity :durability :flavor :texture])

(loop
  [combos (four-combos 100)
   highest 0
   highest-500 0]
  (if (empty? combos)
    [highest highest-500] ;; answers for parts 1 and 2
    (let [spoon-combo (first combos)
          score (apply * (map #(feature-score % spoon-combo facts) key-features))
          calories (feature-score :calories spoon-combo facts)]
      (recur (rest combos)
             (max highest score)
             (if (= 500 calories) (max highest-500 score) highest-500)))))
