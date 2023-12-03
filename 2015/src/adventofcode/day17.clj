(ns adventofcode.day17
  (:require [clojure.math.combinatorics :as combo])
  (:require [clojure.string :as str]))

(def containers
  (->> "resources/day17input"
       slurp
       str/split-lines
       (map #(Integer. %))
       (into [])))

(def test-containers '[20 15 10 5 5])

(defn combos
  [containers]
  "The different combos of the given containers, via
  numeric ids (so that duplicate sizes get counted
  separately). Note we're throwing away the first combo
  as it's the empty combo ()."
  (map #(map containers %)
       (rest (combo/subsets (keys (zipmap (range) containers))))))

(defn capacity-pair
  "Given a combo, returns a seq pair of that
  combo and its total capacity."
  [combo]
  [combo (apply + combo)])

(defn will-store?
  "Determines if a particular combo of containers will
  exactly store the given number of litres."
  [litres [_ capacity]]
  (= capacity litres))

(def good-combos
  (filter (partial will-store? 150)
          (map capacity-pair
               (combos containers))))

;; Part 1
(count good-combos)

;; Part 2
(->> (map (fn [[combo _]] (count combo)) good-combos)
     sort
     (partition-by identity)
     first
     count)
