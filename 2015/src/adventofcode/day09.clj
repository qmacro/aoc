(ns adventofcode.day09
  (:require [clojure.math.combinatorics :as combo])
  (:require [clojure.set])
  (:gen-class))

(defn linewise [slurped] (clojure.string/split slurped #"\n"))

(defn a-b-dist
  [fact]
  (let [[a _ b _ dist] (clojure.string/split fact #"\s")]
    [a b (Integer. dist)]))


(defn dist-to-data
  [fact]
  (let [[a b dist] (a-b-dist fact)]
    {(map keyword [a b]) dist, (map keyword [b a]) dist}))

(defn place-pair
  [fact]
  (let [[a b dist] (a-b-dist fact)]
    (set [(keyword a) (keyword b)])))

(def day9 (-> "resources/day09input" slurp linewise))
(def places (into [] (reduce clojure.set/union #{} (map place-pair day9))))
(def distances (reduce merge (map dist-to-data day9)))

(defn from-to-key
  "Expects a vector of 2 places indices, and returns
  a vector of the corresponding place keywords.
  e.g. [0 1] -> [:Tambi :Straylight]"
  [v]
  (map places v))

(defn distance-for-route
  "Take a route vector and returns the total distance.
  e.g. [0 1 2] -> 195"
  [route]
  (->> route
       (partition 2 1)
       (map from-to-key)
       (map distances)
       (reduce +)))

(defn solve
  "..."
  [& args]
  (let [dists (map distance-for-route (combo/permutations (range (count places))))]
    (println

      ;; Part 1
      (apply min dists)

      ;; Part 2
      (apply max dists)

      )))
